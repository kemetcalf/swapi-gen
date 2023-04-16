import "./App.css";
import React from "react";
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

const queryClient = new QueryClient();

class AffiliationRow extends React.Component {
	render() {
		return <li>{this.props.organization}</li>;
	}
}

function GetNewCharacter() {
	const [characterId, setCharacterId] = useState();
	function handleClick() {
		setCharacterId(Math.ceil(Math.random() * 88));
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
						species: data.species,
						homeworld: data.homeworld,
						affiliations: data.affiliations,
					};
				}),
		enabled: characterId > 0,
	});

	if (characterId === undefined)
		return (
			<div>
				<button type="button" onClick={handleClick} className="btn">
					Randomize Character
				</button>
			</div>
		);

	if (isFetching) return "Accessing Galactic Republic records...";

	if (status === "loading") return "Loading Galactic Republic records...";

	if (status === "error")
		return (
			<div>
				<p>`An error has occurred: ${error.message}`</p>
				<button type="button" onClick={handleClick} className="btn">
					Randomize Character
				</button>
			</div>
		);

	console.info({ data, error, body: data.body });

	function heightInFeet(height) {
		const metersToFeet = height * 3.28084;
		const wholeFeet = Math.floor(metersToFeet) + " feet";
		const remainderInIn = " " + Math.floor((metersToFeet % 1) * 12) + " inches";
		return wholeFeet + remainderInIn;
	}

	function firstLetterToUpper(string) {
		const word = string;
		const firstLetter = word.charAt(0);
		const firstLetterCap = firstLetter.toUpperCase();
		const remainingLetters = word.slice(1);
		const capitalizedWord = firstLetterCap + remainingLetters;

		return capitalizedWord;
	}

	const groups = data.affiliations.map((group, i) => {
		return <AffiliationRow key={i} organization={group} />;
	});

	return (
		<div>
			<div>
				<h1>{data.name}</h1>
				<img src={data.image} alt="character headshot"></img>
				<p>Homeworld: {data.homeworld}</p>
				<p>Species: {data.species}</p>
				<p>Height: {heightInFeet(data.height)}</p>
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
			<ReactQueryDevtools initialIsOpen />
		</QueryClientProvider>
	);
}

export default App;
