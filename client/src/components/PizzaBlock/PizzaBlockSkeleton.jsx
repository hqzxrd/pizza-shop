import ContentLoader from "react-content-loader";

const PizzaBlockSkeleton = () => (
  <ContentLoader
    // className="pizza-block"
    speed={2}
    width={290}
    height={560}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="140" cy="115" r="115" />
    <rect x="0" y="240" rx="10" ry="10" width="280" height="23" />
    <rect x="8" y="282" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="400" rx="10" ry="10" width="95" height="30" />
    <rect x="140" y="390" rx="24" ry="24" width="140" height="45" />
  </ContentLoader>
);

export default PizzaBlockSkeleton;
