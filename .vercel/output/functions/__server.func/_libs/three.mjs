import { c as BufferAttribute, g as Vector3, l as BufferGeometry } from "./@react-three/drei+[...].mjs";
//#region node_modules/three/examples/jsm/utils/BufferGeometryUtils.js
/**
* Merges a set of geometries into a single instance. All geometries must have compatible attributes.
*
* @param {Array<BufferGeometry>} geometries - The geometries to merge.
* @param {boolean} [useGroups=false] - Whether to use groups or not.
* @return {?BufferGeometry} The merged geometry. Returns `null` if the merge does not succeed.
*/
function mergeGeometries(geometries, useGroups = false) {
	const isIndexed = geometries[0].index !== null;
	const attributesUsed = new Set(Object.keys(geometries[0].attributes));
	const morphAttributesUsed = new Set(Object.keys(geometries[0].morphAttributes));
	const attributes = {};
	const morphAttributes = {};
	const morphTargetsRelative = geometries[0].morphTargetsRelative;
	const mergedGeometry = new BufferGeometry();
	let offset = 0;
	for (let i = 0; i < geometries.length; ++i) {
		const geometry = geometries[i];
		let attributesCount = 0;
		if (isIndexed !== (geometry.index !== null)) {
			console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.");
			return null;
		}
		for (const name in geometry.attributes) {
			if (!attributesUsed.has(name)) {
				console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + ". All geometries must have compatible attributes; make sure \"" + name + "\" attribute exists among all geometries, or in none of them.");
				return null;
			}
			if (attributes[name] === void 0) attributes[name] = [];
			attributes[name].push(geometry.attributes[name]);
			attributesCount++;
		}
		if (attributesCount !== attributesUsed.size) {
			console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + ". Make sure all geometries have the same number of attributes.");
			return null;
		}
		if (morphTargetsRelative !== geometry.morphTargetsRelative) {
			console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + ". .morphTargetsRelative must be consistent throughout all geometries.");
			return null;
		}
		for (const name in geometry.morphAttributes) {
			if (!morphAttributesUsed.has(name)) {
				console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + ".  .morphAttributes must be consistent throughout all geometries.");
				return null;
			}
			if (morphAttributes[name] === void 0) morphAttributes[name] = [];
			morphAttributes[name].push(geometry.morphAttributes[name]);
		}
		if (useGroups) {
			let count;
			if (isIndexed) count = geometry.index.count;
			else if (geometry.attributes.position !== void 0) count = geometry.attributes.position.count;
			else {
				console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + ". The geometry must have either an index or a position attribute");
				return null;
			}
			mergedGeometry.addGroup(offset, count, i);
			offset += count;
		}
	}
	if (isIndexed) {
		let indexOffset = 0;
		const mergedIndex = [];
		for (let i = 0; i < geometries.length; ++i) {
			const index = geometries[i].index;
			for (let j = 0; j < index.count; ++j) mergedIndex.push(index.getX(j) + indexOffset);
			indexOffset += geometries[i].attributes.position.count;
		}
		mergedGeometry.setIndex(mergedIndex);
	}
	for (const name in attributes) {
		const mergedAttribute = mergeAttributes(attributes[name]);
		if (!mergedAttribute) {
			console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + name + " attribute.");
			return null;
		}
		mergedGeometry.setAttribute(name, mergedAttribute);
	}
	for (const name in morphAttributes) {
		const numMorphTargets = morphAttributes[name][0].length;
		if (numMorphTargets === 0) continue;
		mergedGeometry.morphAttributes = mergedGeometry.morphAttributes || {};
		mergedGeometry.morphAttributes[name] = [];
		for (let i = 0; i < numMorphTargets; ++i) {
			const morphAttributesToMerge = [];
			for (let j = 0; j < morphAttributes[name].length; ++j) morphAttributesToMerge.push(morphAttributes[name][j][i]);
			const mergedMorphAttribute = mergeAttributes(morphAttributesToMerge);
			if (!mergedMorphAttribute) {
				console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + name + " morphAttribute.");
				return null;
			}
			mergedGeometry.morphAttributes[name].push(mergedMorphAttribute);
		}
	}
	return mergedGeometry;
}
/**
* Merges a set of attributes into a single instance. All attributes must have compatible properties and types.
* Instances of {@link InterleavedBufferAttribute} are not supported.
*
* @param {Array<BufferAttribute>} attributes - The attributes to merge.
* @return {?BufferAttribute} The merged attribute. Returns `null` if the merge does not succeed.
*/
function mergeAttributes(attributes) {
	let TypedArray;
	let itemSize;
	let normalized;
	let gpuType = -1;
	let arrayLength = 0;
	for (let i = 0; i < attributes.length; ++i) {
		const attribute = attributes[i];
		if (TypedArray === void 0) TypedArray = attribute.array.constructor;
		if (TypedArray !== attribute.array.constructor) {
			console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.");
			return null;
		}
		if (itemSize === void 0) itemSize = attribute.itemSize;
		if (itemSize !== attribute.itemSize) {
			console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.");
			return null;
		}
		if (normalized === void 0) normalized = attribute.normalized;
		if (normalized !== attribute.normalized) {
			console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.");
			return null;
		}
		if (gpuType === -1) gpuType = attribute.gpuType;
		if (gpuType !== attribute.gpuType) {
			console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.");
			return null;
		}
		arrayLength += attribute.count * itemSize;
	}
	const array = new TypedArray(arrayLength);
	const result = new BufferAttribute(array, itemSize, normalized);
	let offset = 0;
	for (let i = 0; i < attributes.length; ++i) {
		const attribute = attributes[i];
		if (attribute.isInterleavedBufferAttribute) {
			const tupleOffset = offset / itemSize;
			for (let j = 0, l = attribute.count; j < l; j++) for (let c = 0; c < itemSize; c++) {
				const value = attribute.getComponent(j, c);
				result.setComponent(j + tupleOffset, c, value);
			}
		} else array.set(attribute.array, offset);
		offset += attribute.count * itemSize;
	}
	if (gpuType !== void 0) result.gpuType = gpuType;
	return result;
}
//#endregion
//#region node_modules/three/examples/jsm/exporters/STLExporter.js
/**
* An exporter for STL.
*
* STL files describe only the surface geometry of a three-dimensional object without
* any representation of color, texture or other common model attributes. The STL format
* specifies both ASCII and binary representations, with binary being more compact.
* STL files contain no scale information or indexes, and the units are arbitrary.
*
* ```js
* const exporter = new STLExporter();
* const data = exporter.parse( mesh, { binary: true } );
* ```
*
* @three_import import { STLExporter } from 'three/addons/exporters/STLExporter.js';
*/
var STLExporter = class {
	/**
	* Parses the given 3D object and generates the STL output.
	*
	* If the 3D object is composed of multiple children and geometry, they are merged into a single mesh in the file.
	*
	* @param {Object3D} scene - A scene, mesh or any other 3D object containing meshes to encode.
	* @param {STLExporter~Options} options - The export options.
	* @return {string|ArrayBuffer} The exported STL.
	*/
	parse(scene, options = {}) {
		options = Object.assign({ binary: false }, options);
		const binary = options.binary;
		const objects = [];
		let triangles = 0;
		scene.traverse(function(object) {
			if (object.isMesh) {
				const geometry = object.geometry;
				const index = geometry.index;
				const positionAttribute = geometry.getAttribute("position");
				triangles += index !== null ? index.count / 3 : positionAttribute.count / 3;
				objects.push({
					object3d: object,
					geometry
				});
			}
		});
		let output;
		let offset = 80;
		if (binary === true) {
			const bufferLength = triangles * 2 + triangles * 3 * 4 * 4 + 80 + 4;
			const arrayBuffer = new ArrayBuffer(bufferLength);
			output = new DataView(arrayBuffer);
			output.setUint32(offset, triangles, true);
			offset += 4;
		} else {
			output = "";
			output += "solid exported\n";
		}
		const vA = new Vector3();
		const vB = new Vector3();
		const vC = new Vector3();
		const cb = new Vector3();
		const ab = new Vector3();
		const normal = new Vector3();
		for (let i = 0, il = objects.length; i < il; i++) {
			const object = objects[i].object3d;
			const geometry = objects[i].geometry;
			const index = geometry.index;
			const positionAttribute = geometry.getAttribute("position");
			if (index !== null) for (let j = 0; j < index.count; j += 3) writeFace(index.getX(j + 0), index.getX(j + 1), index.getX(j + 2), positionAttribute, object);
			else for (let j = 0; j < positionAttribute.count; j += 3) writeFace(j + 0, j + 1, j + 2, positionAttribute, object);
		}
		if (binary === false) output += "endsolid exported\n";
		return output;
		function writeFace(a, b, c, positionAttribute, object) {
			vA.fromBufferAttribute(positionAttribute, a);
			vB.fromBufferAttribute(positionAttribute, b);
			vC.fromBufferAttribute(positionAttribute, c);
			if (object.isSkinnedMesh === true) {
				object.applyBoneTransform(a, vA);
				object.applyBoneTransform(b, vB);
				object.applyBoneTransform(c, vC);
			}
			vA.applyMatrix4(object.matrixWorld);
			vB.applyMatrix4(object.matrixWorld);
			vC.applyMatrix4(object.matrixWorld);
			writeNormal(vA, vB, vC);
			writeVertex(vA);
			writeVertex(vB);
			writeVertex(vC);
			if (binary === true) {
				output.setUint16(offset, 0, true);
				offset += 2;
			} else {
				output += "		endloop\n";
				output += "	endfacet\n";
			}
		}
		function writeNormal(vA, vB, vC) {
			cb.subVectors(vC, vB);
			ab.subVectors(vA, vB);
			cb.cross(ab).normalize();
			normal.copy(cb).normalize();
			if (binary === true) {
				output.setFloat32(offset, normal.x, true);
				offset += 4;
				output.setFloat32(offset, normal.y, true);
				offset += 4;
				output.setFloat32(offset, normal.z, true);
				offset += 4;
			} else {
				output += "	facet normal " + normal.x + " " + normal.y + " " + normal.z + "\n";
				output += "		outer loop\n";
			}
		}
		function writeVertex(vertex) {
			if (binary === true) {
				output.setFloat32(offset, vertex.x, true);
				offset += 4;
				output.setFloat32(offset, vertex.y, true);
				offset += 4;
				output.setFloat32(offset, vertex.z, true);
				offset += 4;
			} else output += "			vertex " + vertex.x + " " + vertex.y + " " + vertex.z + "\n";
		}
	}
};
//#endregion
export { mergeGeometries as n, STLExporter as t };
