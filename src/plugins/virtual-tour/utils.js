import { PSVError, utils } from 'photo-sphere-viewer';

/**
 * @summary Checks the configuration of a node
 * @package
 * @param {PSV.plugins.VirtualTourPlugin.Node} node
 * @param {boolean} isGps
 */
export function checkNode(node, isGps) {
  if (!node.id) {
    throw new PSVError('No id given for node');
  }
  if (!node.panorama) {
    throw new PSVError(`No panorama provided for node ${node.id}`);
  }
  if (isGps && !(node.position?.length >= 2)) {
    throw new PSVError(`No position provided for node ${node.id}`);
  }
}

/**
 * @summary Checks the configuration of a link
 * @package
 * @param {PSV.plugins.VirtualTourPlugin.Node} node
 * @param {PSV.plugins.VirtualTourPlugin.NodeLink} link
 * @param {boolean} isGps
 */
export function checkLink(node, link, isGps) {
  if (!link.nodeId) {
    throw new PSVError(`Link of node ${node.id} has no target id`);
  }
  if (!isGps && !utils.isExtendedPosition(link)) {
    throw new PSVError(`No position provided for link ${link.nodeId} of node ${node.id}`);
  }
}

/**
 * @summary Changes the color of a mesh
 * @package
 * @param {external:THREE.Mesh} mesh
 * @param {*} color
 */
export function setMeshColor(mesh, color) {
  mesh.material.color.set(color);
  mesh.material.emissive.set(color);
}
