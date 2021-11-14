function highScores(game){

    var highScores = "SELECT FROM user_table_better, COUNT('"+game+"'_score) AS scorecount GROUP BY '"+game+"'_score ORDER BY scorecount DESC LIMIT 10;";
    console.log("scores:" + highScores);

}