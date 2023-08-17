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

contract AppDeployer is DeployHelper {
    //contract types of facets to be deployed
    Diamond _diamond;
    DiamondCutFacet _dCutFacet;
    DiamondLoupeFacet _dLoupe;
    OwnershipFacet _ownerF;
    UnionFacet _unionF;
    ProposalFacet _proposalF;
    DiamondInit _diamondInitC;

    //interfaces with Facet ABI connected to _diamond address
    IDiamondLoupe _iLoupe;
    IDiamondCut _iCut;

    string[] _facetNames;
    address[] _facetAddressList;
    // TEST PRIVATE KEY BELOW
    uint256 constant ACCOUNT_A_PRIVATE = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
    address constant ACCOUNT_A_PUBLIC = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;

    function run() public {
        vm.startBroadcast(ACCOUNT_A_PRIVATE);
        //deploy facets
        _dCutFacet = new DiamondCutFacet();
        _dLoupe = new DiamondLoupeFacet();
        _ownerF = new OwnershipFacet();
        _unionF = new UnionFacet();
        _proposalF = new ProposalFacet();
        _diamondInitC = new DiamondInit();

        string memory semaphoreAddresses = vm.readFile("./src/addresses/semaphore.json");

        address semaphoreVerifier = bytesToAddress(vm.parseJson(semaphoreAddresses, "$.semaphoreVerifier"));

        _facetNames = ["DiamondCutFacet", "DiamondLoupeFacet", "OwnershipFacet", "UnionFacet", "ProposalFacet"];

        // diamod arguments
        DiamondArgs memory _args = DiamondArgs({
            owner: address(ACCOUNT_A_PUBLIC),
            init: address(0),
            initCalldata: abi.encodeWithSignature("init(address verifierAddress)", semaphoreVerifier)
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

        vm.stopBroadcast();
    }
}
