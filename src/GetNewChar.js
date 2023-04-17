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

	if (isFetching) return "Accessing Galactic Republic records...";

	if (status === "loading") return "Loading Galactic Republic records...";

	if (status === "error")
		return (
			<div>
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
		<div className="h-screen bg-accent p-8">
			<div className="card lg:card-side bg-base-100 shadow-xl max-h-min">
				<figure className="max-w-sm">
					<img
						src={data.image}
						alt="character headshot"
						className="mask mask-squircle shadow-2xl"
					/>
				</figure>
				<div className="card-body w-3/5">
					<div className="flex-row">
						<div className="place-content-center">
							<h3 className="text-xl font-bold mt-6">Homeworld: </h3>
							<p>{firstLetterToUpper(data.homeworld)}</p>
							<p>Species: {firstLetterToUpper(data.species)}</p>
							<p>Height: {heightInFeet(data.height)}</p>
							<div className="divider divider-horizontal " />
							<h2 className="text-2xl font-bold mt-6">Affiliations</h2>
							<div>
								<ul>{groups}</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<MainButton getId={handleClick} className="" />
		</div>
	);
}
