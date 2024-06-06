interface PlaylistIconProps {
	className?: string,
	size?: number
}
const PlaylistIcon: React.FC<PlaylistIconProps> = ({
	className,
	size
}) => {
	return (
		<svg 
			role="img" 
			height={size} 
			width={size} 
			aria-hidden="true" 
			viewBox="0 0 24 24" 
			fill="currentColor"
			className={className}
		>
			<path
				d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z">
			</path>
		</svg>
	)
}

export default PlaylistIcon;