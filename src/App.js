import "./App.css";
import React from "react";
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools/build/lib/devtools";
import { useState } from "react";

const queryClient = new QueryClient();

class AffiliationRow extends React.Component {
	render() {
		return <li>{this.props.organization}</li>;
	}
}

function GetNewCharacter() {
	const [characterId, setCharacterId] = useState(1);
	function handleClick() {
		setCharacterId(Math.round(Math.random() * 88));
	}
	const { status, error, data, isFetching } = useQuery({
		queryKey: ["character", characterId],
		queryFn: () =>
			fetch(`https://akabab.github.io/starwars-api/api/id/${characterId}.json`)
				.then((response) => response.json())
				.then((data) => {
					return {
						image: data.image,
						name: data.name,
						height: data.height,
						homeworld: data.homeworld,
						affiliations: data.affiliations,
						loadedCharacter: true,
					};
				}),
	});

	if (isFetching) return "Accessing Galactic Republic records...";

	if (status === "loading") return "Loading Galactic Republic records...";

	if (status === "error") return `An error has occurred: ${error.message}`;

	console.info({ data, error, body: data.body });

	const groups = data.affiliations.map((group, i) => {
		return <AffiliationRow key={i} organization={group} />;
	});

	return (
		<div>
			<div>
				<img src={data.image} alt="character headshot"></img>
				<h1>{data.name}</h1>
				<p>{data.height} m</p>
				<p>Homeworld: {data.homeworld}</p>
				<h2>Affiliations</h2>
				<ul>{groups}</ul>
			</div>

			<button type="button" onClick={handleClick} className="btn">
				Randomize Character
			</button>
		</div>
	);
}

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="App">
				<header className="App-header">
					<GetNewCharacter />
				</header>
			</div>
			{/* <ReactQueryDevtools initialIsOpen /> */}
		</QueryClientProvider>
	);
}

export default App;
