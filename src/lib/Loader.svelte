<div class="loader-container">
	<div class="loader-animate" />
</div>

<style>
	.loader-container {
		display: flex;
		justify-content: center;
		align-items: center;

		width: 100%;
		min-height: 100vh;

		background-color: black;
		color: white;
	}
  
	@keyframes loader-animation {
		25% {
			content: '/';
		}

		50% {
			content: '\2013';
		}

		75% {
			content: '\\';
		}

		100% {
			content: '|';
		}
	}

	.loader-animate {
		height: 1em;
		width: 100%;
		border: none;

		position: relative;
		margin-block-start: 1.5em;
		margin-block-end: 1.5em;
	}

	.loader-animate:after {
		content: '';
		animation: loader-animation 0.5s linear infinite;

		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
