export const getCenter = (box)=>{
    const centerX = box.left + box.width / 2;
    const centerY = box.top + box.height / 2;

    return [centerX, centerY];
}