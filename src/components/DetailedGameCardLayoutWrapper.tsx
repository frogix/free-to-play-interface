import { ReactNode } from "react";

export function DetailedGameCardLayoutWrapper({ children }: { children: ReactNode }) {
	return (
		<div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
			{children}
		</div>
	);
}
