import ContentLoader from 'react-content-loader'

const LoaderSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={300}
    height={490}
    viewBox='0 0 300 490'
    backgroundColor='#f3f3f3'
    foregroundColor='#b0b0b0'
    {...props}
  >
    <rect x='1' y='1' rx='0' ry='0' width='11' height='497' />
    <rect x='466' y='17' rx='0' ry='0' width='8' height='343' />
    <rect x='2' y='0' rx='0' ry='0' width='465' height='9' />
    <rect x='288' y='9' rx='0' ry='0' width='12' height='522' />
    <rect x='8' y='481' rx='0' ry='0' width='465' height='9' />
    <rect x='52' y='64' rx='0' ry='0' width='188' height='66' />
    <rect x='54' y='187' rx='0' ry='0' width='186' height='21' />
    <rect x='52' y='238' rx='0' ry='0' width='13' height='0' />
    <rect x='54' y='226' rx='0' ry='0' width='186' height='21' />
    <rect x='55' y='392' rx='0' ry='0' width='188' height='66' />
    <rect x='57' y='304' rx='0' ry='0' width='186' height='21' />
    <rect x='56' y='341' rx='0' ry='0' width='186' height='21' />
  </ContentLoader>
)

export default LoaderSkeleton
