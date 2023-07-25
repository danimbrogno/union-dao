// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

/**
 * \
 * Authors: Timo Neumann <timo@fyde.fi>, Rohan Sundar <rohan@fyde.fi>
 * EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
 * Abstract Contracts for the shared setup of the tests
 * /*****************************************************************************
 */

import "../src/interfaces/IDiamondCut.sol";
import "../src/facets/DiamondCutFacet.sol";
import "../src/facets/DiamondLoupeFacet.sol";
import "../src/facets/OwnershipFacet.sol";
import "../src/facets/UnionFacet.sol";
import {ProposalFacet} from "../src/facets/ProposalFacet.sol";
import "../src/Diamond.sol";
import {HelperContract} from "./HelperContract.sol";
import {DSTest} from "ds-test/test.sol";
import {Vm} from "forge-std/Vm.sol";

abstract contract AppHarness is HelperContract {
    //contract types of facets to be deployed
    Diamond _diamond;
    DiamondCutFacet _dCutFacet;
    DiamondLoupeFacet _dLoupe;
    OwnershipFacet _ownerF;
    UnionFacet _unionF;
    ProposalFacet _proposalF;

    //interfaces with Facet ABI connected to _diamond address
    IDiamondLoupe _iLoupe;
    IDiamondCut _iCut;

    string[] _facetNames;
    address[] _facetAddressList;

    // deploys _diamond and connects facets
    function setUp() public virtual {
        //deploy facets
        _dCutFacet = new DiamondCutFacet();
        _dLoupe = new DiamondLoupeFacet();
        _ownerF = new OwnershipFacet();
        _unionF = new UnionFacet();
        _proposalF = new ProposalFacet();

        _facetNames = ["DiamondCutFacet", "DiamondLoupeFacet", "OwnershipFacet", "UnionFacet", "ProposalFacet"];

        // diamod arguments
        DiamondArgs memory _args = DiamondArgs({owner: address(this), init: address(0), initCalldata: " "});

        // FacetCut with CutFacet for initialisation
        FacetCut[] memory cut0 = new FacetCut[](1);
        cut0[0] = FacetCut({
            facetAddress: address(_dCutFacet),
            action: IDiamond.FacetCutAction.Add,
            functionSelectors: generateSelectors("DiamondCutFacet")
        });

        // deploy _diamond
        _diamond = new Diamond(cut0, _args);

        //upgrade _diamond with facets

        //build cut struct
        FacetCut[] memory cut = new FacetCut[](4);

        cut[0] = (
            FacetCut({
                facetAddress: address(_dLoupe),
                action: FacetCutAction.Add,
                functionSelectors: generateSelectors("DiamondLoupeFacet")
            })
        );

        cut[1] = (
            FacetCut({
                facetAddress: address(_ownerF),
                action: FacetCutAction.Add,
                functionSelectors: generateSelectors("OwnershipFacet")
            })
        );

        cut[2] = (
            FacetCut({
                facetAddress: address(_unionF),
                action: FacetCutAction.Add,
                functionSelectors: generateSelectors("UnionFacet")
            })
        );

        cut[3] = (
            FacetCut({
                facetAddress: address(_proposalF),
                action: FacetCutAction.Add,
                functionSelectors: generateSelectors("ProposalFacet")
            })
        );

        // initialise interfaces
        _iLoupe = IDiamondLoupe(address(_diamond));
        _iCut = IDiamondCut(address(_diamond));

        //upgrade _diamond
        _iCut.diamondCut(cut, address(0x0), "");

        // get all addresses
        _facetAddressList = _iLoupe.facetAddresses();
    }

    bytes32 internal nextUser = keccak256(abi.encodePacked("user address"));

    function getNextUserAddress() internal returns (address payable) {
        //bytes32 to address conversion
        address payable user = payable(address(uint160(uint256(nextUser))));
        nextUser = keccak256(abi.encodePacked(nextUser));
        return user;
    }

    //create users with 100 ether balance
    function createUsers(uint256 userNum) public returns (address payable[] memory) {
        address payable[] memory users = new address payable[](userNum);
        for (uint256 i = 0; i < userNum; i++) {
            address payable user = getNextUserAddress();
            vm.deal(user, 100 ether);
            users[i] = user;
        }
        return users;
    }
}
