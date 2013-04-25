alert("Hello!");

if (state.history[0] && state.history[0].passage.title != "Begin") {
  setTimeout(function() {
		state.display("Begin");
	}, 1500);
}
