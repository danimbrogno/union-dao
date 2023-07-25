// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../src/facets/DiamondCutFacet.sol";
import "../src/facets/DiamondLoupeFacet.sol";
import "../src/facets/OwnershipFacet.sol";
import "../src/facets/UnionFacet.sol";
import {DiamondInit} from "../src/upgradeInitializers/DiamondInit.sol";
import {Verifier} from "../src/helpers/Verifier.sol";
import {ProposalFacet} from "../src/facets/ProposalFacet.sol";
import {DSTest} from "ds-test/test.sol";
import {DeployHelper} from "./DeployHelper.sol";
import {Diamond, DiamondArgs} from "../src/Diamond.sol";

contract AppDeployer is DeployHelper {
    //contract types of facets to be deployed
    Diamond _diamond;
    DiamondCutFacet _dCutFacet;
    DiamondLoupeFacet _dLoupe;
    OwnershipFacet _ownerF;
    UnionFacet _unionF;
    ProposalFacet _proposalF;
    DiamondInit _diamondInitC;
    Verifier _verifierC;

    //interfaces with Facet ABI connected to _diamond address
    IDiamondLoupe _iLoupe;
    IDiamondCut _iCut;

    string[] _facetNames;
    address[] _facetAddressList;

    function run() public {
        //deploy facets
        _dCutFacet = new DiamondCutFacet();
        _dLoupe = new DiamondLoupeFacet();
        _ownerF = new OwnershipFacet();
        _unionF = new UnionFacet();
        _proposalF = new ProposalFacet();
        _diamondInitC = new DiamondInit();
        _verifierC = new Verifier();

        string memory hasherJson = vm.readFile("./src/compiled/Hasher.json");
        bytes memory hasherBytecode = vm.parseJson(hasherJson, "$.bytecode");
        address hasherAddress = deploy(hasherBytecode);

        _facetNames = ["DiamondCutFacet", "DiamondLoupeFacet", "OwnershipFacet", "UnionFacet", "ProposalFacet"];

        // diamod arguments
        DiamondArgs memory _args = DiamondArgs({
            owner: address(this),
            init: address(0),
            initCalldata: abi.encodeWithSignature(
                "init(address hasherAddress, address verifierAddress)", hasherAddress, address(_verifierC)
                )
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

        // vm.writeJson(""), path);
        // // Diamond proxy addresses, last updated 24.03.2023
        // address DIAMOND_PROXY_MAINNET = 0x32400084C286CF3E17e7B677ea9583e60a000324;
        // // address DIAMOND_PROXY_GOERLI = 0x1908e2BF4a88F91E4eF0DC72f02b8Ea36BEa2319;

        // // Provide zkSync compiler version and address of the diamond proxy on L1
        // Deployer deployer = new Deployer("1.3.7", DIAMOND_PROXY_MAINNET);

        // // Provide path to contract, input params & salt
        // // Returns deployment address on L2
        // deployer.deployFromL1("src/Counter.sol", new bytes(0), bytes32(uint256(1337)));
        // vm.broadcast();
    }
}
