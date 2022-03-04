class TokenResizerHUD {
	//Called when the button is clicked.
	static increaseSize(tokenId) {
		const token = canvas.tokens.get(tokenId);
		const tokenDocument = token.document;
		const currentWidth = token.data.width;
		const currentHeight = token.data.height;
		var tokenSize = {'width': currentWidth + 1, 'height': currentHeight + 1};
		if (currentWidth < 1 || currentHeight < 1 || currentWidth != currentHeight) {
			tokenSize = {'width': currentWidth * 2, 'height': currentHeight * 2};
		}
		tokenDocument.update(tokenSize);
	}

	static decreaseSize(tokenId) {
		const token = canvas.tokens.get(tokenId);
		const tokenDocument = token.document;
		const currentWidth = token.data.width;
		const currentHeight = token.data.height;
		var tokenSize = {'width': currentWidth - 1, 'height': currentHeight - 1};
		if (currentWidth <= 1 || currentHeight <= 1 || currentWidth != currentHeight) {
			tokenSize = {'width': currentWidth / 2, 'height': currentHeight / 2};
		}
		if (tokenSize.width < 0.5 || tokenSize.height < 0.5) return
		tokenDocument.update(tokenSize);
	}


	//Creates a clickable button and adds it to the Token HUD.
	static addIncreaseButton(tokenId, html) {
		const button = document.createElement('div');
		button.classList.add('control-icon');
		button.innerHTML = '<i class="fas fa-plus fa-fw"></i>'
		button.title = 'Increase Size';
		button.id = 'increase-size';

		$(button)
			.click((event) =>
				this.increaseSize(tokenId)
			)

		html.find('div.right').append(button);
	}
	static addDecreaseButton(tokenId, html) {
		const button = document.createElement('div');
		button.classList.add('control-icon');
		button.innerHTML = '<i class="fas fa-minus fa-fw"></i>'
		button.title = 'Decrease Size';
		button.id = 'decrease-size';

		$(button)
			.click((event) =>
				this.decreaseSize(tokenId)
			)

		html.find('div.right').append(button);
	}
}

Hooks.on('renderTokenHUD', (app, html, data) => {
	TokenResizerHUD.addIncreaseButton(data._id, html);
	TokenResizerHUD.addDecreaseButton(data._id, html);
});
