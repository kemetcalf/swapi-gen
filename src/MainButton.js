export default function MainButton(props) {
	const handleClick = props.getId;
	return (
		<button
			type="button"
			onClick={handleClick}
			className="btn btn-primary w-1/5 "
		>
			Randomize Character
		</button>
	);
}
