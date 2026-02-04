import React, { useState } from 'react';
import { Skeleton } from 'antd';

type ImageWithSkeletonProps = {
	src: string;
	alt?: string;
};

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
	src,
	alt = '',
}) => {
	const [loaded, setLoaded] = useState(false);

	return (
		<div
			style={{
				position: 'relative',
				width: '100%',
				height: '350px',
				borderRadius: '8px',
				overflow: 'hidden',
			}}
		>
			{!loaded && (
				<Skeleton.Image
					active
					styles={{
						root: { width: "100%" },
						content: {
							width: '100%',
							height: '350px',
							borderRadius: '8px',
						}
					}}
				/>
			)}

			<img
				src={src}
				alt={alt}
				onLoad={() => setLoaded(true)}
				style={{
					width: '100%',
					maxHeight: '350px',
					objectFit: 'cover',
					borderRadius: '8px',
					position: 'absolute',
					inset: 0,
					opacity: loaded ? 1 : 0,
					transition: 'opacity 0.3s ease',
				}}
			/>
		</div>
	);
};
