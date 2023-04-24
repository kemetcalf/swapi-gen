import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import MainButton from "./MainButton";

class AffiliationRow extends React.Component {
	render() {
		return <li>{this.props.organization}</li>;
	}
}

export default function GetNewCharacter() {
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
			<div className="flex flex-col h-screen place-items-center place-content-center">
				<MainButton getId={handleClick} />
			</div>
		);

	if (isFetching)
		return (
			<div className="flex flex-col h-screen place-items-center place-content-center">
				"Accessing Galactic Republic records..."
			</div>
		);

	if (status === "loading") return;
	<div className="flex flex-col h-screen place-items-center place-content-center">
		"Loading Galactic Republic records..."
	</div>;

	if (status === "error")
		return (
			<div className="flex flex-col h-screen place-items-center place-content-center">
				<p>`An error has occurred: ${error.message}`</p>
				<MainButton getId={handleClick} />
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

		if (typeof word === "string") {
			const firstLetter = word.charAt(0);
			const firstLetterCap = firstLetter.toUpperCase();
			const remainingLetters = word.slice(1);
			const capitalizedWord = firstLetterCap + remainingLetters;

			return capitalizedWord;
		} else {
			return "N/A";
		}
	}

	const groups = data.affiliations.map((group, i) => {
		return <AffiliationRow key={i} organization={group} />;
	});

	return (
		<div className="h-screen bg-accent p-8 flex flex-col place-items-center">
			<div className="card lg:card-side bg-base-100 shadow-2xl h-5/6 w-11/12 p-8">
				<figure className="avatar max-w-lg lg:max-w-md min-h-fit p-8">
					<div id="avatar" className="rounded-xl my-8">
						<img
							src={data.image}
							alt="character headshot"
							className="object-none object-top"
						/>
					</div>
				</figure>
				<div className="card-body">
					<h1 className="text-5xl lg:text-7xl font-bold text-secondary ">
						{data.name}
					</h1>
					<div className="divider my-2" />
					<div className="grid grid-cols-2 gap-x-4 ">
						<div>
							<h3>Homeworld: </h3>
							<p>{firstLetterToUpper(data.homeworld)}</p>
							<h3 className="mt-4">Species: </h3>
							<p>{firstLetterToUpper(data.species)}</p>
							<h3 className="mt-4">Height: </h3>
							<p>{heightInFeet(data.height)}</p>
						</div>

						<div className="h-80">
							<h3 className="h-1/6">Affiliations</h3>
							<div className="h-3/4 overflow-auto">
								<ul>{groups}</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="m-6">
				<MainButton getId={handleClick} className="m-6" />
			</div>
		</div>
	);
}
