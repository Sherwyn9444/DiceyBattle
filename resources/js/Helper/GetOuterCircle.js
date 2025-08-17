export const getRandomOutsidePosition = (elementRef, minOffset = 50, maxOffset = 100) => {
  const el = elementRef.value
  if (!el) return null

  const rect = el.getBoundingClientRect()

  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const radius = rect.width / 2

  // Random angle in radians
  const angle = Math.random() * 2 * Math.PI

  // Random distance outside the radius
  const offset = minOffset + Math.random() * (maxOffset - minOffset)
  const distance = radius + offset

  // Convert polar to cartesian coordinates
  const x = centerX + Math.cos(angle) * distance
  const y = centerY + Math.sin(angle) * distance

  return { x, y }
}