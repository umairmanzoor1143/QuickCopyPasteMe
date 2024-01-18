import "./index.scss";

import classNames from "classnames";

export default function Loader(props: { loading?: boolean }) {
  // const loading = useAppSelector((state) => state.global?.loading);
  const loading = false;

  return (
    <div
      className={classNames("pre-loader", {
        loading: props.loading ?? loading,
      })}
    >
      <div className='loader'>
        <div className='bar1'></div>
        <div className='bar2'></div>
        <div className='bar3'></div>
        <div className='bar4'></div>
        <div className='bar5'></div>
        <div className='bar6'></div>
        <div className='bar7'></div>
        <div className='bar8'></div>
        <div className='bar9'></div>
        <div className='bar10'></div>
        <div className='bar11'></div>
        <div className='bar12'></div>
      </div>
    </div>
  );
}
type RequestLoaderPorps = IConProps & {
  children?: any;
  isLoading: boolean;
};
export const RequestLoader = (props: RequestLoaderPorps) => {
  const {
    width = 28,
    height = 28,
    children,
    isLoading,
    className = "",
    ...rest
  } = props;
  return isLoading ? (
    <div
      className={classNames(`request_loader ${className}`, {
        loading: isLoading,
      })}
      // wwidth={width}
      // hheight={height}
    >
      <div className='loader'>
        <div className='bar1'></div>
        <div className='bar2'></div>
        <div className='bar3'></div>
        <div className='bar4'></div>
        <div className='bar5'></div>
        <div className='bar6'></div>
        <div className='bar7'></div>
        <div className='bar8'></div>
        <div className='bar9'></div>
        <div className='bar10'></div>
        <div className='bar11'></div>
        <div className='bar12'></div>
      </div>
      <div className='loader loader3'>
        <div className='spinner'>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <svg>
          <defs>
            <filter id='goo'>
              <feGaussianBlur
                in='SourceGraphic'
                stdDeviation='8'
                result='blur'
              />
              <feColorMatrix
                in='blur'
                values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 50 -8'
                result='goo'
              />
              <feBlend in='SourceGraphic' in2='goo' />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  ) : children ? (
    children
  ) : null;
};

export const RequestCircularLoader = (props: RequestLoaderPorps) => {
  const {
    width = 28,
    height = 28,
    children,
    isLoading,
    className = "",

    ...rest
  } = props;
  return isLoading ? (
    <div
      className={classNames(`circular-loader ${className}`, {
        loading: isLoading,
      })}
    >
      <div className='loader loader1'>
        <span
          className='loader-box'
          style={{ width: `${width}px`, height: `${height}px` }}
        ></span>
      </div>
    </div>
  ) : children ? (
    children
  ) : null;
};
