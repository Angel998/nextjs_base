export default function initialProps(props) {
  let appData = props.req.appData;
  if (!appData) appData = {};
  return {
    ...appData,
  };
}
