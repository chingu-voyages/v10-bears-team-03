import { useState, useEffect } from 'react'

const ResponsiveLayout = ({ breakpoint, renderMobile, renderDesktop }) => {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener(‘resize’, handleResize)
    return () => { window.removeEventListener(‘resize’, handleResize) }
  }, [])
  return (width > breakpoint ? renderDesktop() : renderMobile())
}