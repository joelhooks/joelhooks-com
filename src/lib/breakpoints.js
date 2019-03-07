const minSM = 545
const minMD = 768
const minLG = 992
const minXL = 1200
const minXXL = 1920

export const bpMinSM = `@media (min-width: ${minSM}px)`
export const bpMinMD = `@media (min-width: ${minMD}px)`
export const bpMinLG = `@media (min-width: ${minLG}px)`
export const bpMinXL = `@media (min-width: ${minXL}px)`
export const bpMinXXL = `@media (min-width: ${minXXL}px)`

export const bpMaxXS = `'@media (min-width: ${minSM - 1}px)'`
export const bpMaxSM = `'@media (min-width: ${minMD - 1}px)'`
export const bpMaxMD = `'@media (min-width: ${minLG - 1}px)'`
export const bpMaxLG = `'@media (min-width: ${minXL - 1}px)'`
