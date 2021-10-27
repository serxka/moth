import React, { createContext, useContext, useEffect, useState } from "react";
import Watame, { Client } from "watame";

const Context = createContext<any>({});
const ClientContext = () => {
	return useContext(Context);
};

export default ClientContext;

export const ClientProvider = (props: any) => {
	const [data, setData] = useState<Client | undefined>(undefined);

	const getClient = async () => {
		const client = await Watame.client("http://localhost:80");
		setData(client);
	};

	useEffect(() => {
		getClient();
	}, []);

	return <Context.Provider value={data}>{props.children}</Context.Provider>;
};
