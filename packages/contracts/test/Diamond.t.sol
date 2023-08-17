// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import {Diamond, DiamondArgs} from "../src/Diamond.sol";
import {IDiamond} from "../src/interfaces/IDiamond.sol";
import {IDiamondCut} from "../src/interfaces/IDiamondCut.sol";
import {DiamondInit} from "../src/upgradeInitializers/DiamondInit.sol";
import {DiamondCutFacet} from "../src/facets/DiamondCutFacet.sol";
import {DiamondLoupeFacet} from "../src/facets/DiamondLoupeFacet.sol";
import {OwnershipFacet} from "../src/facets/OwnershipFacet.sol";
import {AppDeployer} from "../script/AppDeployer.s.sol";

contract DiamondTest is AppDeployer, Test {
    Diamond diamond;

    function setUp() public {
        address alice = vm.addr(1);

        IDiamond.FacetCut[] memory cuts = new IDiamond.FacetCut[](3);

        DiamondInit diamondInit = new DiamondInit();
        DiamondCutFacet diamondCut = new DiamondCutFacet();
        DiamondLoupeFacet diamondLoupe = new DiamondLoupeFacet();
        OwnershipFacet ownership = new OwnershipFacet();

        cuts[0] = IDiamond.FacetCut({
            facetAddress: address(diamondCut),
            action: IDiamond.FacetCutAction.Add,
            functionSelectors: generateSelectors("DiamondCutFacet")
        });

        cuts[1] = (
            IDiamond.FacetCut({
                facetAddress: address(diamondLoupe),
                action: IDiamond.FacetCutAction.Add,
                functionSelectors: generateSelectors("DiamondLoupeFacet")
            })
        );

        cuts[2] = (
            IDiamond.FacetCut({
                facetAddress: address(ownership),
                action: IDiamond.FacetCutAction.Add,
                functionSelectors: generateSelectors("OwnershipFacet")
            })
        );

        DiamondArgs memory _args =
            DiamondArgs({owner: alice, init: address(diamondInit), initCalldata: abi.encodeWithSignature("init()")});

        diamond = new Diamond(cuts, _args);
    }
}
