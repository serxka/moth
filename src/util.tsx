import { useRef, useEffect } from "react";
import _ from "lodash";

const conf = {
	apiuri: `http://${window.location.host.split(":")[0]}:80`,
};

function useDeepCmpMemo<T>(val: T) {
	const ref = useRef<T>();
	if (!_.isEqual(val, ref.current)) ref.current = val;
	return ref.current;
}

function useEffectDeep(cb: any, deps: any[]) {
	useEffect(cb, deps.map(useDeepCmpMemo));
}

export { useEffectDeep };

export default conf;
