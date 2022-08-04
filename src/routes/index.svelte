<script>
	import VerifyResult from '$lib/VerifyResult.svelte';
	import { twitchApiClientId } from '$lib/store.js';

	function authorizeUser() {
		const responseType = 'token+id_token';
const scope = 'openid+user_read';
		// const redirectURL = window.location.protocol + '//' + window.location.hostname + ':5173/form';
		const redirectURL = window.location.protocol + '//' + window.location.hostname + '/form';

		window.location.assign(
			`https://id.twitch.tv/oauth2/authorize?response_type=${responseType}&client_id=${$twitchApiClientId}&scope=${scope}&redirect_uri=${redirectURL}`
		);
	}
</script>

<svelte:head>
	<title>懶猫訂閲者回饋說明與填寫</title>
	<!-- Validate your twitter card with https://www.opengraph.xyz/  -->
	<!-- HTML Meta Tags -->
	<meta
		name="description"
		content="懶貓訂閱者回饋開放填單啦！在填單之前，請確定你已詳細閱讀相關說明。"
	/>

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://failverde-2207-subscriber-reward.netlify.app" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="懶猫訂閲者回饋說明與填寫" />
	<meta
		property="og:description"
		content="懶貓訂閱者回饋開放填單啦！在填單之前，請確定你已詳細閱讀相關說明。"
	/>
	<meta property="og:image" content="https://i.imgur.com/u5ZOMTC.png" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="netlify.app" />
	<meta property="twitter:url" content="https://failverde-2207-subscriber-reward.netlify.app" />
	<meta name="twitter:title" value="懶猫訂閲者回饋說明與填寫" />
	<meta
		name="twitter:description"
		content="懶貓訂閱者回饋開放填單啦！在填單之前，請確定你已詳細閱讀相關說明。"
	/>
	<meta property="twitter:image" content="https://i.imgur.com/u5ZOMTC.png" />
</svelte:head>
<article style="padding-top: 1rem; box-shadow: 0 0 8px var(--primary-color);">
	<h1>懶猫訂閲者回饋<wbr />說明與填寫</h1>
	<section style="display: flow-root;">
		<p style="font-size: 1.25em; text-align: center;">
			懶貓訂閱者回饋開放填單啦！<br />
			在填單之前，請確定你已詳細閱讀以下內容。
		</p>
		<h2>回饋說明</h2>
		<div class="float-right" style="margin: 18px 0; text-align: center;">
			<a href="https://i.imgur.com/u5ZOMTC.png" rel="noreferrer noopener" target="_blank">
				<img
					src="https://i.imgur.com/u5ZOMTC.png"
					style="max-width: 320px; width: 100%;"
					alt="reward example"
				/>
			</a>
			<div>點擊可看大圖</div>
		</div>
		<h3>回饋內容</h3>
		<p>
			這次的回饋內容是外徑 8 公分、內徑 7.5 公分，杯高 10.4 公分的鋼杯，<br />
			還能讓你客製化想刻在杯身上的內容！<br />
			但要注意的是，<b>客製化的內容只能是「最長四個字的英文或數字」</b>。
		</p>
		<p>
			審核結果位於此頁面的最下方，可以使用 <code>End</code> 鍵<br />
			或點擊<a href="#verify-result">此處</a>快速移動到該區塊。
		</p>
		<h3>填單條件</h3>
		<p>
			請到
			<a href="https://www.twitch.tv/subscriptions" rel="noreferrer noopener" target="_blank">
				Twitch 的訂閱頁面
			</a>
			確認你是否符合下列<b>任一條件</b>：
		</p>
		<ul>
			<li><b>連續訂閱六個月以上</b></li>
			<ul>
				<li>不限訂閱層級</li>
				<li>中間<b>不可斷訂超過一個月</b></li>
				<li>
					六個月<b>不含他人送訂</b>
					<ul>
						<li>
							若中間有收到送訂，請參考示例的<br />
							「你是被人送訂而六個月斷掉的訂閱者」
						</li>
					</ul>
				</li>
			</ul>
			<li><b>一次補滿六個月訂閱</b></li>
			<ul>
				<li>不限訂閱層級</li>
				<li>
					不是層級３，是
					<a href="https://i.imgur.com/Ma2a6Kh.png" rel="noreferrer noopener" target="_blank">
						一次付清六個月份的訂閱
					</a>
				</li>
			</ul>
		</ul>
		<h3>填單期間</h3>
		<p>2022/08/25 至 2022/09/25</p>
		<h3>寄送時間</h3>
		<p>未定</p>
	</section>
	<div style="padding: 16px; padding-bottom: 0;">
		<p>
			為了確認你的訂閱者身份，除了基礎的寄送資料外，<br />
			還需要請你<b>依照下列要求，截圖訂閱資格之後上傳</b>，<br />
			並<b>於填單時，於指定欄位附上圖片網址</b>。<br />
			（可使用 Win+Shift+S 拉選範圍截圖，<wbr />開啟小畫家貼上、存檔後，上傳至
			<a href="https://imgur.com/" rel="noreferrer noopener" target="_blank">Imgur</a>
			）
		</p>
	</div>
	<section>
		<h2 style="margin-top: 0;">截圖示例</h2>
		<div style="display: flow-root;">
			<div class="float-right" style="margin: 24px 0; text-align: center;">
				<a href="https://i.imgur.com/MYsttEC.jpg" rel="noreferrer noopener" target="_blank">
					<img
						src="https://i.imgur.com/MYsttEC.jpg"
						style="max-width: 320px; width: 100%;"
						alt="capture example 1"
					/>
				</a>
			</div>
			<h3>
				你是<b>連續訂閱六個月以上</b><br />
				或<b>一次補滿六個月訂閱</b>的訂閱者
			</h3>
			<p>
				請截圖
				<a href="https://www.twitch.tv/subscriptions" rel="noreferrer noopener" target="_blank">
					Twitch 訂閱頁面
				</a>
				，截圖需包含：
			</p>
			<ul>
				<li>點擊右上角選單顯示的<b>使用者名稱</b></li>
				<li>總和至少<b>六個月的訂閱狀況</b></li>
			</ul>
		</div>
		<div style="display: flow-root;">
			<div class="float-right" style="margin: 24px 0; text-align: center;">
				<a href="https://i.imgur.com/xZ9b1pR.jpg" rel="noreferrer noopener" target="_blank">
					<img
						src="https://i.imgur.com/xZ9b1pR.jpg"
						style="max-width: 320px; width: 100%;"
						alt="capture example 2"
					/>
				</a>
			</div>
			<h3>
				你是<b>連續訂閱六個月以上</b>，<br />
				但訂閱頁面<b>未顯示六個月</b>的訂閱者
			</h3>
			<p>
				請截圖
				<a
					href="https://www.twitch.tv/payments?tab=purchase-history"
					rel="noreferrer noopener"
					target="_blank"
				>
					Twitch Wallet
				</a>
				，截圖需包含：
			</p>
			<ul>
				<li>點擊右上角選單顯示的<b>使用者名稱</b></li>
				<li>斷定未超過一個月的訂閱狀況</li>
			</ul>
		</div>
		<div style="display: flow-root;">
			<div class="float-right" style="margin: 24px 0; text-align: center;">
				<a href="https://i.imgur.com/ZyXNJGx.jpg" rel="noreferrer noopener" target="_blank">
					<img
						src="https://i.imgur.com/ZyXNJGx.jpg"
						style="max-width: 320px; width: 100%;"
						alt="capture example 3"
					/>
				</a>
			</div>
			<h3>你是<b>被人送訂而六個月斷掉</b>的訂閱者</h3>
			<p>
				請截圖
				<a
					href="https://www.twitch.tv/payments?tab=purchase-history"
					rel="noreferrer noopener"
					target="_blank"
				>
					Twitch Wallet
				</a>
				，截圖需包含：
			</p>
			<ul>
				<li>點擊右上角選單顯示的<b>使用者名稱</b></li>
				<li>
					中間的訂閱狀況
					<ul>
						<li><b>除去他人送訂</b>總訂閱時間須滿六個月</li>
					</ul>
				</li>
				<li>被人送訂的通知（請另外截下後，貼至圖片不會遮擋到資訊的地方）</li>
			</ul>
		</div>
	</section>
	<hr />
	<section>
		<h2>其他事項</h2>
		<ul>
			<li>如果你是住在台灣以外的乾爹，地址依照國際格式填寫即可</li>
			<li>
				掛號寄出後請各位務必領取，重寄流程非常麻煩，<b>若你沒有領取，就會取消下次參加回饋的資格</b>
			</li>
			<li>
				截止日當天，我們會再檢查一次填單者是否擁有訂閱者身份，<b>當天訂閱過期的人會視同無效</b
				>，請記得不要斷訂～
			</li>
			<li>
				若交單後需要修改資料，或是有其它此頁沒寫到的相關疑問，請直接
				<b>
					於 <a href="https://discord.gg/lancat" rel="noreferrer noopener" target="_blank">
						Discord
					</a> 上私訊懶貓聯絡
				</b>
			</li>
		</ul>
	</section>
	<hr />
	<section>
		<div style="text-align: center;">
			<button class="btn" on:click={authorizeUser}>我要填單</button>
		</div>
	</section>
	<hr />
	<section id="verify-result">
		<h2>審核結果</h2>
		<VerifyResult />
	</section>
</article>

<style scoped>
	h1 {
		margin: 0 auto 1rem;
		padding: 0;
		width: fit-content;
		color: white;
		background: black;
		text-align: center;
		font-size: 2rem;
		word-break: keep-all;
	}
	/* 3D box  */
	h2 {
		position: relative;
		border: 3px solid #03a9f4;
		color: #03a9f4;
		padding: 0.5rem;
		margin: 3rem 0.5rem 0 0;

		text-shadow: none;
	}
	h2::before,
	h2::after {
		position: absolute;
		margin: 0;
		border: solid #03a9f4;
		content: '';
		box-sizing: content-box;
	}
	h2::before {
		top: -10px;
		right: -16px;
		width: 10px;
		height: 100%;
		border-width: 2px 3px 4px 0px;
		transform: skewY(-45deg);
	}
	h2::after {
		top: -16px;
		left: 4px;
		width: 100%;
		height: 10px;
		border-width: 3px 2px 0px 4px;
		transform: skewX(-45deg);
	}

	h3 {
		margin-bottom: 0.5rem;
		padding-left: 10px;
		border-left: 3px solid #03a9f4;
	}

	hr {
		height: 4rem;
		margin: 0;
		border: none;
		background-color: #e8f5e9;
	}
	hr:after {
		content: '';
	}
	hr:nth-child(4n + 3) {
		clip-path: polygon(0 0, 100% 0, 0 100%);
	}
	hr:nth-child(4n + 1) {
		clip-path: polygon(0 0, 0 100%, 100% 100%);
	}

	article {
		background-color: #e1f5fe;

		max-width: 960px;
		margin: auto;
	}

	section {
		padding: 1rem;
	}
	section:nth-child(4n + 2) {
		background-color: #e8f5e9;
	}
	section:nth-child(4n + 2) h2,
	section:nth-child(4n + 2) h2::after,
	section:nth-child(4n + 2) h2::before {
		border-color: #4caf50;
		color: #4caf50;
	}
	section:nth-child(4n + 2) h3 {
		border-color: #4caf50;
	}

	/* details {
		padding: 1rem;
		margin: 1.5rem 0;
		border: 4px solid #424242;
		border-radius: 12px;
	}
	details:last-child {
		margin-bottom: 0;
	}
	details summary {
		cursor: pointer;
		font-weight: bold;
	}
	details summary:focus {
		outline: none;
	} */

	b {
		background: linear-gradient(transparent 66%, #f6ff66 0);
	}

	@media screen and (min-width: 576px) {
		.float-right {
			float: right;
		}
		/* .float-left {
			float: left;
		} */
		h1 {
			transform: skewX(-10deg);
		}
	}
</style>
