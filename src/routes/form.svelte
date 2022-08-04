<script>
	// TODO:
	// [x] 1. check if all required field is filled
	// [x] 2. display field notification message
	// [x] 3. disable input after check confirmation checkbox
	// [x] 4. disable submit after click
	// [ ] 5. display success or failure message

	import { onMount } from 'svelte';
	import Loader from '$lib/Loader.svelte';
	import { twitchApiUrl, twitchApiClientId, spreadsheetApiUrl } from '$lib/store.js';

	let isLoaded = false;
	function pageLoaded() {
		isLoaded = true;
	}

	let isError = false;
	let isConfirmed = false;
	let isSubmitted = false;
	let unfilledFieldArr = [];

	let locationInfo = {
		isOverseas: false,
		city: '',
		district: '',
		zipcode: '',
		address: ''
	};
	let contactInfo = {
		login: '',
		displayName: '',
		name: '',
		phoneNumber: '',
		email: '',
		screenshotUrl: '',
		customWord: ''
	};

	function initLocationInfo(isOverseas) {
		locationInfo = isOverseas
			? {
					isOverseas,
					country: '',
					state: '',
					city: '',
					zipcode: '',
					address: ''
			  }
			: {
					isOverseas,
					city: '',
					district: '',
					zipcode: '',
					address: ''
			  };
	}

	// https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
	function parseJwt(token) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		var jsonPayload = decodeURIComponent(
			window
				.atob(base64)
				.split('')
				.map(function (c) {
					return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join('')
		);

		return JSON.parse(jsonPayload);
	}

	function getTwitchData() {
		const parameterReference = ['access_token', 'id_token', 'scope', 'token_type'];
		let urlParameter = {};
		let urlHash = new URL(window.location.href).hash.slice(1).split('&');
		urlHash.forEach((hash) => (urlParameter[hash.split('=')[0]] = hash.split('=')[1]));
		if (JSON.stringify(Object.keys(urlParameter)) === JSON.stringify(parameterReference)) {
			let decodedIDToken = parseJwt(urlParameter.id_token);
			const getParameter = `/users?id=${decodedIDToken.sub}`;
			fetch($twitchApiUrl + getParameter, {
				method: 'GET',
				headers: new Headers({
					Authorization: `Bearer ${urlParameter.access_token}`,
					'Client-ID': $twitchApiClientId
				}),
				mode: 'cors',
				cache: 'default'
			})
				.then((response) => {
					if (response.status === 200) {
						return response.json();
					}
				})
				.then((response) => {
					contactInfo.login = response.data[0].login;
					contactInfo.displayName = response.data[0].display_name;
				});
			// return true;
		} else {
			isError = true;
			// return false;
		}
	}

	function handleCustomWordInput(e) {
		let newValue = e.target.value;
		let re = /^[A-Za-z0-9]{0,4}/g;
		contactInfo.customWord = newValue.match(re)[0];
		e.target.value = newValue.match(re)[0];
	}

	function getUnfilledField() {
		const requiredFieldReference = {
			name: '收件者名稱',
			country: '國家',
			// state: '洲',
			city: '城市',
			// district: '區',
			// zipcode: '郵遞區號',
			address: '地址',
			phoneNumber: '聯絡電話',
			email: 'E-mail',
			screenshotUrl: '訂閱截圖網址',
			customWord: '客製詞句'
		};
		if (!locationInfo.isOverseas) delete requiredFieldReference.country;

		// return []
		// 	.concat(
		// 		Object.entries(contactInfo)
		// 			.filter((contactData) => contactData[1] == '')
		// 			.map((contactData) => contactData[0])
		// 	)
		// 	.concat(
		// 		Object.entries(locationInfo)
		// 			.filter((locationData) => locationData[1] == '')
		// 			.map((locationData) => locationData[0])
		// 	)
		// 	.map((fieldKey) => fieldReference[fieldKey])
		// 	.filter((unfilledFieldKey) => unfilledFieldKey);

		const allInfo = Object.assign(contactInfo, locationInfo);
		return Object.entries(requiredFieldReference)
			.filter((requiredField) => allInfo[requiredField[0]] == '')
			.map((requiredField) => requiredField[1]);
	}

	async function handleSubmitClick(e) {
		unfilledFieldArr = getUnfilledField();
		if (unfilledFieldArr.length != 0) {
			document.getElementById('js-message-box').classList.remove('hidden');
			setTimeout(() => {
				document.getElementById('js-message-box').classList.add('hidden');
			}, 5000);
		} else {
			const submitAddress = (
				locationInfo.isOverseas
					? // Overseas
					  `${locationInfo.address}, ${locationInfo.city}, ${locationInfo.state} ${
							locationInfo.zipcode
					  } ${locationInfo.state || locationInfo.zip ? ',' : ''} ${locationInfo.country}`
					: // Taiwan
					  `${locationInfo.zipcode} ${locationInfo.city} ${locationInfo.district} ${locationInfo.address}`
			)
				.trim()
				.replace(/  +/g, ' ');
			const submitData = {
				action: 'appendRow',
				data: {
					// 提交時間
					1: new Date().toISOString(),
					// Twitch 帳號
					2: contactInfo.login,
					// Twitch 暱稱
					3: contactInfo.displayName,
					// 收件者名稱
					4: contactInfo.name,
					// 海外
					5: locationInfo.isOverseas,
					// 國家
					6: locationInfo.isOverseas ? locationInfo.country : '',
					// 縣市
					7: locationInfo.isOverseas ? '' : locationInfo.city,
					// 郵遞區號
					8: locationInfo.isOverseas ? '' : locationInfo.zipcode,
					// 地址
					9: locationInfo.isOverseas
						? submitAddress
						: `${locationInfo.district} ${locationInfo.address}`,
					// 聯絡電話
					10: contactInfo.phoneNumber,
					// E-mail
					11: contactInfo.email,
					// 訂閱截圖網址
					12: contactInfo.screenshotUrl,
					// 客製詞句
					13: contactInfo.customWord
				}
			};

			e.currentTarget.disabled = true;
			await fetch($spreadsheetApiUrl, {
				redirect: 'follow',
				method: 'POST',
				body: JSON.stringify(submitData),
				headers: {
					'Content-Type': 'text/plain;charset=utf-8'
				}
			});
			isSubmitted = true;
			setTimeout(() => {
				window.location.assign('./');
			}, 5000);
		}
	}

	let geodata = [];
	onMount(async () => {
		getTwitchData();
		fetch('./taiwan_zipcode.json')
			.then((res) => res.json())
			.then((data) => (geodata = data));
	});
</script>

<svelte:window on:load={pageLoaded()} />

{#if isLoaded}
	{#if isError}
		<div
			style="width: 100%; min-height: 100vh; display: grid; place-content: center; border-radius: 4px;"
		>
			<p
				style="margin: auto; padding: 16px; width: fit-content; border-radius: 4px; background: white; box-shadow: 0 0 8px var(--primary-color);"
			>
				請回到<a href="./">首頁</a>重新進行認證。
			</p>
		</div>
	{:else if isSubmitted}
		<div
			style="width: 100%; min-height: 100vh; display: grid; place-content: center; border-radius: 4px;"
		>
			<p
				style="margin: auto; padding: 16px; width: fit-content; border-radius: 4px; background: white; box-shadow: 0 0 8px var(--primary-color);"
			>
				填單已提交，將於 5 秒後回到首頁。
			</p>
		</div>
	{:else}
		<div class="form-container" style="box-shadow: 0 0 8px var(--primary-color);">
			<h1>填單</h1>
			<form>
				<!-- twitch info -->
				<div class="input-field">
					<span><i aria-hidden="true" class="fa fa-brands fa-twitch" /></span>
					<span>{contactInfo.login ? `${contactInfo.login} (${contactInfo.displayName})` : ''}</span
					>
				</div>
				<!-- name -->
				<div class="input-field">
					<span><i aria-hidden="true" class="fa fa-solid fa-user" /></span>
					<input
						type="text"
						bind:value={contactInfo.name}
						placeholder="收件者名稱（必填）"
						autocomplete="name"
						required
						disabled={isConfirmed}
					/>
				</div>
				<!-- country -->
				<div style="margin-bottom: 16px;">
					<div>
						<input
							type="radio"
							id="taiwan"
							name="location"
							value={false}
							bind:group={locationInfo.isOverseas}
							on:change={() => initLocationInfo(false)}
							disabled={isConfirmed}
						/>
						<label class="input-label" for="taiwan">台灣</label>
						<input
							type="radio"
							id="overseas"
							name="location"
							value={true}
							bind:group={locationInfo.isOverseas}
							on:change={() => initLocationInfo(true)}
							disabled={isConfirmed}
						/>
						<label class="input-label" for="overseas">海外</label>
					</div>
				</div>
				<!-- live in taiwan -->
				{#if !locationInfo.isOverseas}
					<div>
						<div class="input-field">
							<select
								bind:value={locationInfo.city}
								on:change={() => (locationInfo.district = '')}
								required
								disabled={isConfirmed}
							>
								<option value="" selected disabled hidden>縣市</option>
								{#each Array.from(new Set(geodata
											.map((item) => item['行政區名'].slice(0, 3))
											.filter((item) => item !== '南海諸'))) as city}
									<option value={city}>{city}</option>
								{/each}
							</select>
							<select
								on:change={(e) => {
									locationInfo.zipcode = e.target.value.split(' ')[0];
									locationInfo.district = e.target.value.split(' ')[1];
								}}
								required
								disabled={isConfirmed}
							>
								<option value="" selected disabled hidden>區</option>
								{#each geodata
									.filter((item) => item['行政區名'].slice(0, 3) == locationInfo.city)
									.map((item) => `${item['_x0033_碼郵遞區號']} ${item['行政區名'].slice(3)}`) as district}
									<option>{district}</option>
								{/each}
							</select>
						</div>
						<div class="input-field">
							<input
								type="text"
								bind:value={locationInfo.address}
								placeholder="地址（必填，縣市、鄉鎮市區不用重複填寫）"
								autocomplete="shipping street-address"
								required
								disabled={isConfirmed}
							/>
						</div>
					</div>
				{:else}
					<!-- live overseas -->
					<div class="input-field">
						<input
							type="text"
							bind:value={locationInfo.country}
							placeholder="國家（必填）"
							autocomplete="shipping country"
							required
							disabled={isConfirmed}
						/>
						<input
							type="text"
							bind:value={locationInfo.state}
							placeholder="洲"
							autocomplete="region"
							disabled={isConfirmed}
						/>
					</div>
					<div>
						<div class="input-field">
							<input
								type="text"
								bind:value={locationInfo.city}
								placeholder="城市（必填）"
								autocomplete="city"
								required
								disabled={isConfirmed}
							/>
							<input
								type="text"
								bind:value={locationInfo.zipcode}
								placeholder="郵遞區號"
								disabled={isConfirmed}
							/>
						</div>
						<div class="input-field">
							<input
								type="text"
								bind:value={locationInfo.address}
								placeholder="地址（必填）"
								autocomplete="shipping street-address"
								required
								disabled={isConfirmed}
							/>
						</div>
					</div>
				{/if}
				<!-- phone -->
				<div class="input-field">
					<span><i aria-hidden="true" class="fa fa-solid fa-mobile-screen" /></span>
					<input
						type="tel"
						bind:value={contactInfo.phoneNumber}
						placeholder="聯絡電話（必填）"
						autocomplete="tel"
						required
						disabled={isConfirmed}
					/>
				</div>
				<!-- email -->
				<div class="input-field">
					<span><i aria-hidden="true" class="fa fa-envelope" /></span>
					<input
						type="email"
						bind:value={contactInfo.email}
						placeholder="E-mail（必填）"
						autocomplete="email"
						required
						disabled={isConfirmed}
					/>
				</div>
				<!-- subscriber image -->
				<div class="input-field">
					<span><i aria-hidden="true" class="fa fa-solid fa-link" /></span>
					<input
						type="text"
						bind:value={contactInfo.screenshotUrl}
						placeholder="訂閱截圖網址（必填）"
						required
						disabled={isConfirmed}
					/>
				</div>
				<!-- special symbol -->
				<div class="input-field">
					<span><i aria-hidden="true" class="fa fa-solid fa-font" /></span>
					<input
						type="text"
						bind:value={contactInfo.customWord}
						on:input|preventDefault={handleCustomWordInput}
						placeholder="客製詞句（必填）"
						required
						disabled={isConfirmed}
					/>
				</div>
				<!-- input confirm -->
				<div style="margin-bottom: 16px;">
					<input type="checkbox" id="inputCheck" bind:checked={isConfirmed} />
					<label for="inputCheck">我確定已詳閱相關說明，以及上述內容輸入無誤</label>
				</div>
				<div id="js-message-box" class="message-box hidden">
					請填寫以下欄位：<br />
					{#each unfilledFieldArr as unfilledField, i}
						{#if i === unfilledFieldArr.length - 1}
							{unfilledField}
						{:else}
							{unfilledField}、
						{/if}
					{/each}
				</div>
				<button on:click|preventDefault={handleSubmitClick} disabled={!isConfirmed}>提交</button>
			</form>
		</div>
	{/if}
{:else}
	<Loader />
{/if}

<style>
	.form-container {
		margin: 8% auto 0;
		max-width: 720px;
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
	}
	h1 {
		margin: 0;
		padding: 12px 0;
		border-top: 5px solid #e8f5e9;
		background: white;
		text-align: center;
	}
	form {
		padding: 8px 24px 24px;
		background: white;
	}

	.input-field {
		position: relative;
		margin-bottom: 16px;
		display: flex;
		align-items: center;
		border: 1px solid #ccc;
	}
	.input-field:hover,
	.input-field input:hover,
	.input-field select:hover {
		background: #fbfbfb;
	}
	.input-field > span:first-child {
		padding: 4px;
		border-right: 1px solid #ccc;
	}
	input:not([type='radio']):not([type='checkbox']),
	input:not([type='radio']):not([type='checkbox']):focus,
	select,
	/* and the account and nickname line */
	.input-field > span:not(:first-child) {
		padding-left: 12px;
		width: 100%;
		height: 24px;
		border: none;
		outline: none;
	}
	input[type='radio'],
	input[type='checkbox'],
	select {
		cursor: pointer;
	}
	.input-label {
		user-select: none;
		cursor: pointer;
	}
	input:disabled,
	select:disabled,
	input:disabled + .input-label {
		background-color: white;
		cursor: not-allowed;
	}
	input[type='radio'] {
		margin-right: 0;
	}
	.input-field input + input {
		border-left: 1px solid #ccc !important;
	}
	.fa {
		width: 20px;
		text-align: center;
	}
	.message-box {
		margin-bottom: 16px;
		padding: 12px;
		background: #f2e700;
		color: black;
		border-radius: 8px;
	}
	.message-box.hidden {
		display: none;
	}
	button {
		width: 100%;
		height: 36px;
		line-height: 36px;
		border: none;
		cursor: pointer;
		background: var(--primary-color);
		color: white;
		transition: filter 0.3s;
	}
	button:hover {
		filter: brightness(90%);
	}
	button:disabled {
		background: darkGray;
		color: white;
		cursor: not-allowed;
	}
</style>
