<template>
	<footer class="footer">
		<div class="container">
			<p class="footer-text">
				Built with
				<font-awesome-icon class="footer-icon" icon="heart" />
				by
				<a
					class="footer-link"
					href="https://github.com/thariqaudah"
					target="_blink"
					>Thariq 'Audah</a
				>
			</p>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
.footer {
	padding: 96px 0 32px;
	text-align: center;

	.footer-text {
		color: #999;

		&:hover {
			color: #888;
		}

		.footer-link {
			text-decoration: underline;

			&:hover {
				color: var(--primary-color);
			}
		}
	}

	.footer-icon {
		color: #e94646;
	}
}
</style>
