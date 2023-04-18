export default function MainButton(props) {
	const handleClick = props.getId;
	return (
		<button
			type="button"
			onClick={handleClick}
			className="btn btn-primary shadow-xl w-1/5 min-w-fit"
		>
			Randomize Character
		</button>
	);
}
