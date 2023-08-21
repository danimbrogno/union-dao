// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "../src/facets/DiamondCutFacet.sol";
import "../src/facets/DiamondLoupeFacet.sol";
import "../src/facets/OwnershipFacet.sol";
import "../src/facets/UnionFacet.sol";
import {DiamondInit} from "../src/upgradeInitializers/DiamondInit.sol";
import {ProposalFacet} from "../src/facets/ProposalFacet.sol";
import "forge-std/test.sol";
import {DeployHelper} from "./DeployHelper.sol";
import {Diamond, DiamondArgs} from "../src/Diamond.sol";
import {SemaphoreVerifier} from "semaphore/base/SemaphoreVerifier.sol";

contract AppDeployer is DeployHelper {
    //contract types of facets to be deployed
    Diamond _diamond;
    DiamondCutFacet _dCutFacet;
    DiamondLoupeFacet _dLoupe;
    OwnershipFacet _ownerF;
    UnionFacet _unionF;
    ProposalFacet _proposalF;
    DiamondInit _diamondInitC;
    SemaphoreVerifier _semaphoreVerifier;

    //interfaces with Facet ABI connected to _diamond address
    IDiamondLoupe _iLoupe;
    IDiamondCut _iCut;

    string[] _facetNames;
    address[] _facetAddressList;
    // TEST PRIVATE KEY BELOW
    uint256 constant ACCOUNT_A_PRIVATE = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
    address constant ACCOUNT_A_PUBLIC = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
    error NotDeployed(string contractName);

    function run() public {
        vm.startBroadcast(ACCOUNT_A_PRIVATE);
        //deploy facets
        _dCutFacet = new DiamondCutFacet();
        _dLoupe = new DiamondLoupeFacet();
        _ownerF = new OwnershipFacet();
        _unionF = new UnionFacet();
        _proposalF = new ProposalFacet();
        _diamondInitC = new DiamondInit();
         if (address(_diamondInitC) == address(0)) { revert NotDeployed("DiamondInit"); }

        address semaphoreVerifier = address(new SemaphoreVerifier());

        _facetNames = ["DiamondCutFacet", "DiamondLoupeFacet", "OwnershipFacet", "UnionFacet", "ProposalFacet"];

        // diamod arguments
        DiamondArgs memory _args = DiamondArgs({
            owner: address(ACCOUNT_A_PUBLIC),
            init: address(_diamondInitC),
            initCalldata: abi.encodeWithSelector(DiamondInit.init.selector, semaphoreVerifier)
        });

        // FacetCut with CutFacet for initialisation
        FacetCut[] memory cut0 = new FacetCut[](1);
        cut0[0] = FacetCut({
            facetAddress: address(_dCutFacet),
            action: FacetCutAction.Add,
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

        vm.stopBroadcast();
    }
}
