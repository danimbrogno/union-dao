// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "solidity-stringutils/strings.sol";
import "../src/interfaces/IDiamond.sol";
import "../src/interfaces/IDiamondLoupe.sol";
import {Script} from "forge-std/Script.sol";

contract DeployHelper is IDiamond, IDiamondLoupe, Script {
    using strings for *;

    function deploy(bytes memory _data) public returns (address pointer) {
        bytes memory code = abi.encodePacked(hex"63", uint32(_data.length), hex"80600E6000396000F3", _data);

        assembly {
            pointer := create(0, add(code, 32), mload(code))
        }
    }
    // return array of function selectors for given facet name

    function bytesToAddress(bytes memory bys) public pure returns (address addr) {
        assembly {
            addr := mload(add(bys, 20))
        }
    }

    function generateSelectors(string memory _facetName) internal returns (bytes4[] memory selectors) {
        //get string of contract methods
        string[] memory cmd = new string[](4);
        cmd[0] = "forge";
        cmd[1] = "inspect";
        cmd[2] = _facetName;
        cmd[3] = "methods";
        bytes memory res = vm.ffi(cmd);
        string memory st = string(res);

        // extract function signatures and take first 4 bytes of keccak
        strings.slice memory s = st.toSlice();

        // Skip TRACE lines if any
        strings.slice memory nl = "\n".toSlice();
        strings.slice memory trace = "TRACE".toSlice();
        while (s.contains(trace)) {
            s.split(nl);
        }

        strings.slice memory colon = ":".toSlice();
        strings.slice memory comma = ",".toSlice();
        strings.slice memory dbquote = '"'.toSlice();
        selectors = new bytes4[]((s.count(colon)));

        for (uint256 i = 0; i < selectors.length; i++) {
            s.split(dbquote); // advance to next doublequote
            // split at colon, extract string up to next doublequote for methodname
            strings.slice memory method = s.split(colon).until(dbquote);
            selectors[i] = bytes4(method.keccak());
            strings.slice memory selectr = s.split(comma).until(dbquote); // advance s to the next comma
        }
        return selectors;
    }

    // helper to remove index from bytes4[] array
    function removeElement(uint256 index, bytes4[] memory array) public pure returns (bytes4[] memory) {
        bytes4[] memory newarray = new bytes4[](array.length-1);
        uint256 j = 0;
        for (uint256 i = 0; i < array.length; i++) {
            if (i != index) {
                newarray[j] = array[i];
                j += 1;
            }
        }
        return newarray;
    }

    // helper to remove value from bytes4[] array
    function removeElement(bytes4 el, bytes4[] memory array) public pure returns (bytes4[] memory) {
        for (uint256 i = 0; i < array.length; i++) {
            if (array[i] == el) {
                return removeElement(i, array);
            }
        }
        return array;
    }

    function containsElement(bytes4[] memory array, bytes4 el) public pure returns (bool) {
        for (uint256 i = 0; i < array.length; i++) {
            if (array[i] == el) {
                return true;
            }
        }

        return false;
    }

    function containsElement(address[] memory array, address el) public pure returns (bool) {
        for (uint256 i = 0; i < array.length; i++) {
            if (array[i] == el) {
                return true;
            }
        }

        return false;
    }

    function sameMembers(bytes4[] memory array1, bytes4[] memory array2) public pure returns (bool) {
        if (array1.length != array2.length) {
            return false;
        }
        for (uint256 i = 0; i < array1.length; i++) {
            if (containsElement(array1, array2[i])) {
                return true;
            }
        }

        return false;
    }

    function getAllSelectors(address diamondAddress) public view returns (bytes4[] memory) {
        Facet[] memory facetList = IDiamondLoupe(diamondAddress).facets();

        uint256 len = 0;
        for (uint256 i = 0; i < facetList.length; i++) {
            len += facetList[i].functionSelectors.length;
        }

        uint256 pos = 0;
        bytes4[] memory selectors = new bytes4[](len);
        for (uint256 i = 0; i < facetList.length; i++) {
            for (uint256 j = 0; j < facetList[i].functionSelectors.length; j++) {
                selectors[pos] = facetList[i].functionSelectors[j];
                pos += 1;
            }
        }
        return selectors;
    }

    // implement dummy override functions
    function diamondCut(FacetCut[] calldata _diamondCut, address _init, bytes calldata _calldata) external {}
    function facetAddress(bytes4 _functionSelector) external view override returns (address facetAddress_) {}
    function facetAddresses() external view override returns (address[] memory facetAddresses_) {}
    function facetFunctionSelectors(address _facet)
        external
        view
        override
        returns (bytes4[] memory facetFunctionSelectors_)
    {}
    function facets() external view override returns (Facet[] memory facets_) {}
}
