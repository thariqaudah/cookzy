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
					>Thariq Audah</a
				>
			</p>
			<a
				class="footer-github"
				href="https://github.com/thariqaudah"
				target="_blank"
			>
				<img
					class="icon-github"
					src="@/assets/icon-github.svg"
					alt="Github icon"
				/>
			</a>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
.footer {
	padding: 96px 0 16px;
	text-align: center;

	.footer-text {
		color: #999;

		&:hover {
			color: #888;
		}

		.footer-link {
			line-height: 1.2;
			border-bottom: 1px solid currentColor;

			&:hover {
				color: var(--primary-color);
			}
		}
	}

	.footer-icon {
		color: #e94646;
	}

	.footer-github {
		margin-top: 16px;
		.icon-github {
			width: 32px;
		}
	}
}
</style>
