<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	view{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	@font-face {
		font-family: CustomFont;
		src: url('./static/style/iconfont.ttf');
	}
</style>
