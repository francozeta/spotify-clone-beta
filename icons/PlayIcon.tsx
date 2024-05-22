interface PlayIconProps {
	className?: string,
	size?: number
}

const PlayIcon: React.FC<PlayIconProps> = ({
	className,
	size
}) => {
	return (
		<svg 
			viewBox="0 0 24 24" 
			className={className} 
			width={size}
			height={size} 
			fill="currentColor"
		>
			<path fill="currentColor" d="M8 5.14v14l11-7-11-7z"></path>
		</svg>
	)
}

export default PlayIcon;