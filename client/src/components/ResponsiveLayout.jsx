import { useWindowDimensions } from '../WindowDimensionsProvider';

const ResponsiveLayout = ({ breakPoint, renderMobile, renderDesktop }) => {
  const { width } = useWindowDimensions()
  return (width > breakPoint ? renderDesktop() : renderMobile())
}

export default ResponsiveLayout;