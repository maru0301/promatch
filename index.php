<html>
	<head>
		<title>Webデータ取得</title>
	</head>
	<body>
		<form action="" method="POST" style="width:100%;text-align:center">
			Webデータ取得<br>
<textarea cols="400" rows="600" maxlength="20000" >
				<?php
	/*
				
					$proxy = array(
						"http" => array(
								"proxy" => "proxy2.hq.scei.sony.co.jp:10080",
								'request_fulluri' => true,
								'ignore_errors' => true,
							),
					);
					
					$proxy_context = stream_context_create($proxy);
					//Webデータ取得先アドレス
//					$url = "http://webings.net/sample/";
					$url = "http://matchhistory.na.leagueoflegends.com/en/#match-details/TRKR1/890266?gameHash=ab79c17ca6b4d876&tab=overview";
					//Webデータ取得
					$html = @file_get_contents($url, false, $proxy_context );
					$html = htmlspecialchars($html);
					$html = mb_convert_encoding($html,"SJIS", "auto");

					//改行コードを変換
					$html = str_replace("¥n", "<br/>", $html);
					//Webデータ表示
					echo $html;

					function getPageTitleFromURL($url) {
						
						$curl = curl_init($url);

						if (!$curl) {
							// cURLが使えない場合はURLにリンクを貼る
							return '<a href="' . $url . '">' . htmlspecialchars($url) . '</a>';
						}

						// HTMLソースを取得
						curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
						$html = curl_exec($curl);
						echo($html);
						curl_close($curl);
						
						if (preg_match("/<title>(.*?)<\/title>/i", $html, $matches)) {
							// タイトル文字列にリンクを貼る
							return '<a href="' . $url . '">' . $matches[1] . '</a>';
						}

						// URLにリンクを貼る
						return '<a href="' . $url . '">' . htmlspecialchars($url) . '</a>';
						
						$ch=curl_init();
						curl_setopt($ch,CURLOPT_URL,$url);
						curl_setopt($ch,CURLOPT_HEADER,FALSE);
						curl_setopt($ch,CURLOPT_RETURNTRANSFER,TRUE);
						curl_setopt($ch,CURLOPT_FOLLOWLOCATION,TRUE);
						$honjp_xml=curl_exec($ch);
						curl_close($ch);//ここまで修正
						$honjp_xml=simplexml_load_string($honjp_xml);
						return ($honjp_xml);
					}

					$html = getPageTitleFromURL("http://matchhistory.na.leagueoflegends.com/en/#match-details/TRKR1/890266?gameHash=ab79c17ca6b4d876&tab=overview");
					echo($html);
					*/
					require_once 'goutte.phar';

use Goutte\Client;

// 1Goutteオブジェクトの生成
$client = new Client();

// 2http://www.time-j.net/から「東京の過去36時間の天気」を取得
$crawler = $client->request('GET',
  'http://www.time-j.net/WorldTime/Weather/Weather36h/Asia/Tokyo');
  echo($crawler);
/*
// 3「東京の過去36時間の天気」テーブルを指定
$dom = $crawler->filter('table.wtable td');

$ary = array(); // 「現地時間」、「天気」の保存用
$time = "";     // 「現地時間」の一時保管用
$ix = 0;        // 現在行

// 4テーブルから1行ずつ取得する
$dom->each(function ($node) use (&$ix, &$time, &$ary) {

  // 5「現地時間」を取得する
  if (($ix % 8)==0) {
    $time = $node->text();
  }
  // 6「天気」を取得する
  else if ((($ix-1) % 8)==0) {
    $ary[ $time ] = $node->text();
  }
  $ix++;
});

// 7現地時間、天気を表示する
foreach ($ary as $t => $w){
  echo $t. " ". $w. "<br />";
}
*/
				?>
				</textarea>
		</form>
	</body>
</html>