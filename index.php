<!DOCTYPE html>
<html lang="en">
<head>
  <title>TicTacToe</title>
  <link rel="stylesheet" href="stylesheets/font_faces.css" />
  <link rel="stylesheet" href="stylesheets/application.css" />
  <script src="javascripts/jquery.js"></script>
  <script src="javascripts/application-minimax.js"></script>
</head>

<body>
  <h1>
    <span>Tic-Tac-Toe</span>
    <p>&copy; Arnelle Balane</p>
    <a href="download.php">Get it on Google Play</a>
  </h1>

  <div class="grid">
    <div class="cell" data-index="0"></div>
    <div class="cell" data-index="1"></div>
    <div class="cell" data-index="2"></div>

    <div class="cell" data-index="3"></div>
    <div class="cell" data-index="4"></div>
    <div class="cell" data-index="5"></div>

    <div class="cell" data-index="6"></div>
    <div class="cell" data-index="7"></div>
    <div class="cell" data-index="8"></div>
  </div>

  <h2 id="status">Your turn</h2>
  <button id="start">Start Game</button>
</body>
</html>