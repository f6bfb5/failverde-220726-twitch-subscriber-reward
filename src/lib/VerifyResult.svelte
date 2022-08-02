<script>
	let verifyResultFilter = 'all';
	let verifyResultSearch = '';

	let verifyResultData = [
		{
			timestamp: new Date().toISOString(),
			twitch_id: 'aaaa',
			isPassed: true
		},
		{
			timestamp: new Date().toISOString(),
			twitch_id: 'bbbb',
			isPassed: false,
			reason: '地址有誤'
		}
	];
	console.log(Object.entries(verifyResultData));
</script>

<div class="verify-result-container">
	<div class="verify-result-header">
		<input type="text" placeholder="Twitch 帳號" bind:value={verifyResultSearch} />
		<input
			type="radio"
			id="verify-result-all"
			name="verify-result-filter"
			value="all"
			bind:group={verifyResultFilter}
		/>
		<label for="verify-result-all">全部</label>
		<input
			type="radio"
			id="verify-result-passed"
			name="verify-result-filter"
			value="passed"
			bind:group={verifyResultFilter}
		/>
		<label for="verify-result-passed">已通過</label>
		<input
			type="radio"
			id="verify-result-rejected"
			name="verify-result-filter"
			value="rejected"
			bind:group={verifyResultFilter}
		/>
		<label for="verify-result-rejected">未通過</label>
	</div>
	<table>
		<thead>
			<tr>
				<th>審核時間</th>
				<th>Twitch 帳號</th>
				<th>審核結果</th>
			</tr>
		</thead>
		<tbody>
			{#each Object.entries(verifyResultData)
				.filter(([i, data]) => {
					switch (verifyResultFilter) {
						case 'all':
							return data;
						case 'passed':
							return data.isPassed;
						case 'rejected':
							return !data.isPassed;
						default:
							return data;
					}
				})
				.filter(([i, data]) => {
					return data.twitch_id.startsWith(verifyResultSearch);
				}) as [i, data]}
				<tr>
					<td> {data.timestamp}</td>
					<td>{data.twitch_id}</td>
					<td>
						<span class={data.isPassed ? '' : 'rejected'}>
							{data.isPassed ? '通過' : '未通過'}
						</span>
						{#if !data.isPassed}
							<br />{data.reason}
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style scoped>
	.verify-result-container {
		margin: 16px;
		max-height: 85vh;
		overflow: auto;
	}
	.verify-result-header {
		position: sticky;
		top: 0;
		left: 0;
		background: #e8f5e9;
	}
	.verify-result-header input[type='text'] {
		float: right;
	}
	.verify-result-header input[type='text']:after {
		content: '';
		clear: both;
	}
	table {
		padding: 0 0.5em 0.5em;
		width: 100%;
		background: #a7dce9;
		border-spacing: 0;
	}
	thead {
		position: sticky;
		top: 24px;
		left: 0;
		background: #a7dce9;
		text-align: left;
	}

	tbody td {
		width: calc(100% / 3);
	}
	tbody tr:nth-child(2n + 1) {
		background: #8cd2e2;
	}
	input[type='radio'] {
		display: none;
	}
	label {
		padding: 0px 10px;
		border-radius: 4px 4px 0px 0px;
		background: #71c7db;
		color: white;
		cursor: pointer;
	}
	label:hover,
	input[type='radio']:checked + label {
		background: #3bb2cd;
	}
	.rejected {
		color: #d7003a;
		font-weight: bold;
	}

	@media screen and (max-width: 576px) {
		.verify-result-header input[type='text'] {
			float: none;
			display: block;
		}
	}
</style>
