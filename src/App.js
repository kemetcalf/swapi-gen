import "./index.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GetNewCharacter from "./GetNewChar";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="App">
				<GetNewCharacter />
			</div>
			<ReactQueryDevtools initialIsOpen />
		</QueryClientProvider>
	);
}

export default App;
