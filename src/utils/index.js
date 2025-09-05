export const utils = {
  isHexAddress(addr) {
    if (typeof addr !== 'string') return false
    if (!addr.startsWith('0x')) return false
    return addr.length === 42 && /^0x[0-9a-fA-F]{40}$/.test(addr)
  },

  niceUsd(n, maxFrac = 0) {
    if (n === null || n === undefined || Number.isNaN(n)) return '—'
    return Number(n).toLocaleString(undefined, { 
      minimumFractionDigits: maxFrac, 
      maximumFractionDigits: maxFrac 
    })
  },

  nicePct(p, digits = 0) {
    if (p === null || p === undefined || Number.isNaN(p)) return '—'
    return (Number(p) * 100).toFixed(digits) + '%'
  },

  clamp(n, lo, hi) { 
    return Math.max(lo, Math.min(hi, n)) 
  },

  daysTo(endDate) {
    if (!endDate) return null
    const now = new Date()
    const end = new Date(endDate)
    if (isNaN(end.getTime())) return null
    const ms = end.getTime() - now.getTime()
    const d = Math.ceil(ms / (1000 * 60 * 60 * 24))
    return Math.max(0, d)
  },

  horizonBucket(days) {
    if (days === null) return 'unknown'
    if (days <= 7) return 'short'
    if (days <= 45) return 'medium'
    return 'long'
  },

  since(ts) {
    if (!ts) return ''
    const d = new Date(ts)
    const diff = (Date.now() - d.getTime()) / 1000
    if (diff < 60) return `${Math.floor(diff)}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return d.toLocaleDateString()
  }
}