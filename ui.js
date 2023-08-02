<script>
    document.getElementById('topic').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        e.preventDefault();
        document.getElementById('generate-button').click();
    }
});

document.getElementById("generate-button").addEventListener("click", function(e){
    e.preventDefault();

    var generateButton = this;

    if (generateButton.disabled) return;

    generateButton.disabled = true;

    var topic = document.getElementById('topic').value.trim();

    if (!topic) {
        showMessage('Please enter something!');
        generateButton.disabled = false;
        return;
    }

    var loading = document.getElementById('loading');
    var result = document.getElementById('result');
    var resultC = document.getElementById('result-container');

    loading.style.display = 'block';
    resultC.style.display = 'none';

    var formData = new FormData();
    formData.append('action', 'custom_tool_youtube_title_generator');
    formData.append('topic', topic);

    fetch('/wp-admin/admin-ajax.php', { method: 'POST', body: formData })
        .then(response => response.json())
        .then(data => {
            loading.style.display = 'none';
            if (data.data.success) { // Updated this line
                result.innerHTML = '';
                data.data.titles.forEach(title => {
    var card = document.createElement('div');
    card.className = 'card';
    var titleText = document.createElement('span');
    titleText.className = 'title-text';
    titleText.textContent = title;
    card.appendChild(titleText);
    var copyIconContainer = document.createElement('div');
    copyIconContainer.className = 'copy-icon-container';
    var copyIcon = document.createElement('i');
    copyIcon.className = 'fas fa-copy tiny-copy-icon';
    copyIcon.addEventListener('click', function() {
        navigator.clipboard.writeText(title);
        showMessage('Copied to clipboard!');
    });
    copyIconContainer.appendChild(copyIcon);
    card.appendChild(copyIconContainer);
    result.appendChild(card);
});

                resultC.style.display = 'block';
            } else {
                showMessage("AI bot not available, please try again later!");
            }
            generateButton.disabled = false;
        })
        .catch(error => {
            showMessage("Something Went Wrong, please try again later!");
            generateButton.disabled = false;
        });

});

document.getElementById('copy-button').addEventListener('click', function() {
    var titles = Array.from(document.getElementById('result').getElementsByClassName('card')).map(el => el.textContent).join('\n');
    navigator.clipboard.writeText(titles);
    showMessage('Copied to clipboard!');
});

document.getElementById('message-close').addEventListener('click', function() {
    document.getElementById('message-box').style.display = 'none';
});

function showMessage(message) {
    var messageBox = document.getElementById('message-box');
    var messageText = document.getElementById('message-text');
    messageText.textContent = message;
    messageBox.style.display = 'flex';
}

</script>
