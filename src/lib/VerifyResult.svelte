<script>
	import { onMount } from 'svelte';
	import { spreadsheetApiUrl } from '$lib/store.js';
	let verifyResultFilter = 'all';
	let verifyResultSearch = '';

	let verifyResultData = [];

	// https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
	function uniqByKeepLast(a, key) {
		return [
			...new Map(
				a.map(x => [key(x), x])
			).values()
		]
	}

	async function fetchVerifyResultData() {
		const action = 'getVerifyResult';
		const getParameter = `?action=${action}`;
		await fetch($spreadsheetApiUrl + getParameter, {
			method: 'GET'
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				Object.values(data[2]).forEach((d, i) => {
					// How can I convert a string to boolean in JavaScript? - Stack Overflow
					// https://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript
					let dataToAdd = {
						twitch_id: data[2][i][0]
					};
					try {
						dataToAdd.isPassed = JSON.parse(data[15][i][0]);

					} catch {
						dataToAdd.isPassed = '';
					}
					// let dataToAdd = {
					// 	twitch_id: data[2][i][0],
					// 	isPassed: data[15][i][0] == '' ? '' : JSON.parse(data[15][i][0])
					// };
					if (data[16][i] != '') dataToAdd.reason = data[16][i][0];
					verifyResultData.push(dataToAdd);
					verifyResultData = verifyResultData;
				});
				verifyResultData = uniqByKeepLast(verifyResultData, it => it.twitch_id);
				// console.log(uniqByKeepLast(verifyResultData, it => it.twitch_id));
				// console.log(verifyResultData);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	onMount(() => {
		fetchVerifyResultData();
	});

	$: verifyResultData;
</script>

<div class="verify-result-container">
	<table>
		<thead>
			<tr>
				<th colspan="3" class="verify-result-header">
					<div class="verify-result-header--search">
						共有 {verifyResultData.length} 筆資料
						<input type="text" placeholder="搜尋 Twitch 帳號..." bind:value={verifyResultSearch} />
					</div>
					<div class="verify-result-header--filter">
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
				</th>
			</tr>
			<tr>
				<!-- <th>審核時間</th> -->
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
					<!-- <td>{new Date(data.timestamp)}</td> -->
					<td>{data.twitch_id}</td>
					<td>
						<span class={data.isPassed === '' ? 'examining' : data.isPassed ? '' : 'rejected'}>
							{data.isPassed === '' ? '審核中' : data.isPassed ? '通過' : '未通過'}
						</span>
						{#if !data.isPassed && data.reason}
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
		margin: 16px 16px 0;
		height: 85vh;
		overflow: auto;
	}
	.verify-result-header {
		width: 100%;
		background: #e8f5e9;
	}
	.verify-result-header--search {
		float: right;
	}
	.verify-result-header--search:after {
		content: '';
		display: block;
		clear: both;
	}

	/* tableのヘッダを固定してスクロールさせる方法 */
	/* https://csshtml.work/table-scroll/ */
	table {
		padding: 0 0.5em 0.5em;
		width: 100%;
		background: #a7dce9;
		border-spacing: 0;
	}
	thead {
		position: sticky;
		width: 100%;
		top: 0;
		background: #a7dce9;
		text-align: left;
	}

	/* tbody td:nth-child(1) {
		width: 20%;
	}
	tbody td:not(:nth-child(1)) {
		width: 40%;
	} */
	tbody td {
		width: 50%;
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
		background: #28869c;
	}
	.rejected {
		color: #ff4b00;
		font-weight: bold;
	}
	.examining {
		color: #f2e700;
	}
	.rejected {
		text-shadow: -1px -1px #e0eeee, -1px 0px #e0eeee, -1px 1px #e0eeee, 0px -1px #e0eeee,
			0px 0px #e0eeee, 0px 1px #e0eeee, 1px -1px #e0eeee, 1px 0px #e0eeee, 1px 1px #e0eeee;
	}
	.examining {
		text-shadow: -1px -1px #242222, -1px 0px #242222, -1px 1px #242222, 0px -1px #242222,
			0px 0px #242222, 0px 1px #242222, 1px -1px #242222, 1px 0px #242222, 1px 1px #242222;
	}

	@media screen and (max-width: 768px) {
		.verify-result-header--search {
			float: none;
			display: block;
		}
		.verify-result-header--search,
		.verify-result-header--filter {
			text-align: center;
		}
		.verify-result-header--filter {
			margin-top: 4px;
		}
	}
</style>
