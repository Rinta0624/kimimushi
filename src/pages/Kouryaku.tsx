import { type FC } from 'react';
import {
  AppBar, Toolbar, Typography, Container, Box, Accordion, AccordionSummary,
  AccordionDetails, Paper, Divider, Chip, Card, CardContent, CardMedia, Stack,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button
} from "@mui/material";

// --- アイコンをインポート ---
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'; // 基本操作
import GavelIcon from '@mui/icons-material/Gavel'; // 戦闘要素
import MenuBookIcon from '@mui/icons-material/MenuBook'; // スキル解説
import SecurityIcon from '@mui/icons-material/Security'; // 敵攻略
import WhatshotIcon from '@mui/icons-material/Whatshot'; // 魔王化ゲージ
import BrokenImageIcon from '@mui/icons-material/BrokenImage'; // ブレイク
import FlashOnIcon from '@mui/icons-material/FlashOn'; // ジャスト回避
import FaceIcon from '@mui/icons-material/Face'; // 人間フォーム
import AcUnitIcon from '@mui/icons-material/AcUnit'; // 魔王フォーム

// --- 攻略情報をデータとして整理 ---

const skillsData = {
  human: [
    { key: "W", name: "Attack (攻撃)", description: "多段ヒットする連続攻撃。プレイヤーの下に攻撃回数が書いてある。1ヒットあたりの威力は低いが、ブレイクゲージを削るための主力となる。クリティカル判定は、この一連の攻撃の最後に一度だけ行われる。" },
    { key: "D", name: "Blade Dance (剣の舞)", description: "1ターンを消費し、Attackの攻撃回数を永続的に+1する自己強化スキル。戦闘が長引くほどに真価を発揮する、人間フォームの切り札。" },
    { key: "A", name: "Recollection (追憶)", description: "このゲームで最も重要なスキル。1ターンを消費し、マリーとの思い出を追憶することで、魔王化ゲージを2減少させる。魔王の力を使った代償を浄化できる、唯一の手段だ。" },
    { key: "S", name: "Shift (変身)", description: "魔王フォームへと変身する。ターンは消費しない。" },
  ],
  demon: [
    { key: "W", name: "Assault (強攻撃)", description: "人間フォームとは比較にならない、高威力の単発攻撃。ブレイクゲージも削るが、使用するたびに魔王化ゲージが3上昇する。クリティカルが発生すれば、一撃で敵をブレイクさせることも可能。" },
    { key: "D", name: "Overcharge (溜め)", description: "1ターンを消費し、魔王化ゲージを５上昇させ、禍々しい力をその身に凝縮させる。次のターン、Assaultが強化される。ブレイク中の敵に叩き込む、最高の準備。" },
    { key: "W", name: "Assault(強化)", description: "Overchargeの次のターンにのみ放てる、最強の一撃。通常のAssaultの3倍の威力を持ち、クリティカル発生率も3倍に跳ね上がる。魔王化ゲージも３上昇する。" },
    { key: "A", name: "Devour (回復)", description: "HPを全快させる、究極の緊急回避手段。しかし、その代償として、魔王化ゲージが４上昇する。「ゲームオーバーになるか、彼女を犠牲にしてでも生き残るか」という、究極の選択を迫られるスキルだ。" },
    { key: "S", name: "Revert (変身解除)", description: "人間の姿へと戻る。ターンは消費しない。" },
  ],
};

const enemiesData = [
  { name: "ステージ１・２　一般教徒 / 教徒エリート", image: "https://pwbueukmjrrfpiojlgyg.supabase.co/storage/v1/object/public/character-images/culter.png", gimmick: "なし", pattern: "単純なナイフによる攻撃を繰り返す。特別なギミックは持たない。", tips: "戦闘の基本を学ぶための、最初の壁だ。まずは人間フォームのAttackでブレイクゲージを削り、敵をブレイクさせる感覚を掴もう。\n敵の攻撃モーションは分かりやすい。焦らず、攻撃が当たる瞬間に合わせてジャスト回避を成功させる練習に最適だ。\n2戦目の教徒エリートは、強制的に魔王フォームになる。ここでは、その圧倒的なAssaultの威力を体感し、魔王の力の強さとリスクを学ぼう。" },
  { name: "詠唱者", image: "https://pwbueukmjrrfpiojlgyg.supabase.co/storage/v1/object/public/character-images/chanter.png", gimmick: "「フェイント」「ブレイクゲージ変化」", pattern: "長い時間をかけて力を溜めるようなモーションを見せるが、実際の攻撃判定と回避受付時間は、そのモーションの最後の一瞬にしかない。", tips: "見た目に惑わされるな。 彼の長い溜めモーションは、あなたを焦らせて「お手つき」を誘うための罠だ。モーションの長さではなく、彼が踏み込む、その一瞬だけを見極めろ。早すぎる回避は、死を招く。" },
  { name: "神官装甲兵", image: "https://pwbueukmjrrfpiojlgyg.supabase.co/storage/v1/object/public/character-images/armer_priest.png", gimmick: "「絶対装甲」", pattern: "巨大な盾で殴る、シンプルだが高威力の攻撃を繰り返す。", tips: "この敵には、ブレイク状態でない限り、あらゆるダメージが「1」しか通らない。人間フォームのAttackで地道にブレイクを狙い、ブレイク時に魔王フォームのAssaultでこの敵のHPを削り切ろう。" },
  { name: "劇場者", image: "https://pwbueukmjrrfpiojlgyg.supabase.co/storage/v1/object/public/character-images/cult-leader.png", gimmick: "「憤怒」", pattern: "魔王フォームのスキルをプレイヤーが使うたびに、攻撃力が永続的に上昇していく。", tips: "魔王の力を、自制せよ。 安易にAssaultやDevourを放てば、敵はあなたの手に負えない怪物へと変貌するだろう。\nこの戦いの主役は人間フォームだ。Skillで攻撃回数を増やし、地道に、しかし着実にダメージを重ねていけ。パーフェクト回避で魔王化ゲージを下げ、Recollectionを使うターンを節約する、高度なリソース管理が勝利の鍵となる。" },
];

const Kouryaku: FC = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            君をむしばむこの力でー攻略情報ページ
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          攻略情報
        </Typography>
        <Divider sx={{ mb: 4 }} />

        {/* --- はじめに --- */}
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderLeft: 5, borderColor: 'primary.main', bgcolor: 'grey.50' }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>はじめに：この世界の戦いの心得</Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, textAlign: 'left' }}>
            『君をむしばむこの力で』の戦闘は、単なるダメージ交換ではない。それは、あなたの「罪悪感」と向き合い、限られた「命」を管理し、一瞬の「閃き」で運命を覆す、思考のパズルである。<br />
            全ての行動には意味があり、代償が伴う。ここで紹介する基本をマスターし、あなただけの最適解を導き出して、二人を待ち受ける過酷な運命に抗ってほしい。
          </Typography>
        </Paper>

        {/* --- 基本操作方法 --- */}
        <Accordion sx={{ textAlign: 'left' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <SportsEsportsIcon color="primary" />
              <Typography variant="h5" sx={{ fontWeight: 'medium' }}>基本操作方法</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ mb: 2 }}>
              このゲームの操作は、キーボードに集約されている。メニューを開く必要はない。全ての行動は、キーを押した瞬間に始まる。
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>キー</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>人間フォームでの行動</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>魔王フォームでの行動</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>敵ターン中の行動</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow><TableCell>W</TableCell><TableCell>Attack (通常攻撃)</TableCell><TableCell>Assault (強攻撃)</TableCell><TableCell>-</TableCell></TableRow>
                  <TableRow><TableCell>A</TableCell><TableCell>Recollection (追憶)</TableCell><TableCell>Devour (回復)</TableCell><TableCell>-</TableCell></TableRow>
                  <TableRow><TableCell>D</TableCell><TableCell>Skill (剣の舞)</TableCell><TableCell>Overcharge (溜め)</TableCell><TableCell>-</TableCell></TableRow>
                  <TableRow><TableCell>S</TableCell><TableCell>Shift (変身)</TableCell><TableCell>Revert (変身解除)</TableCell><TableCell>-</TableCell></TableRow>
                  <TableRow><TableCell>Space</TableCell><TableCell>-</TableCell><TableCell>-</TableCell><TableCell>Evadation (回避)</TableCell></TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>

        {/* --- 戦闘の三大要素 --- */}
        <Accordion sx={{ textAlign: 'left' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <GavelIcon color="primary" />
              <Typography variant="h5" sx={{ fontWeight: 'medium' }}>戦闘の三大要素</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 3 }}>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <Chip icon={<WhatshotIcon />} label="1. 魔王化ゲージ" color="secondary" />
                <Typography variant="h6">— 彼女の命、罪悪感の象徴</Typography>
              </Stack>
              <Typography paragraph>画面左下に表示される、このゲームで最も重要なリソース。これは、あなたのMPではない。マリーの「寿命」そのものだ。</Typography>
              <Typography><strong>上昇条件:</strong> 主に魔王フォームでスキルを使用すると上昇する。</Typography>
              <Typography><strong>影響:</strong> このゲージの値は、物語の結末に直接影響する。ゲージが高い状態で物語を進めると、二人の未来は暗いものになるだろう。</Typography>
              <Typography><strong>管理方法:</strong> 人間フォームのスキル<b>Recollection</b>は、このゲージを減少させることができる唯一の手段であり、あなたの生命線となる。</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 3 }}>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <Chip icon={<BrokenImageIcon />} label="2. ブレイクシステム" color="warning" />
                <Typography variant="h6">— 最大のチャンスタイムを作り出せ</Typography>
              </Stack>
              <Typography paragraph>全ての敵は、HPとは別に<b>「ブレイクゲージ」</b>を持っている。これを0にすることで、戦闘を圧倒的に有利に進めることができる。</Typography>
              <Typography><strong>ブレイクゲージを削る方法:</strong> 人間フォームのAttack、クリティカルヒット。</Typography>
              <Typography><strong>ブレイク状態の効果:</strong> 敵は1ターンの間、完全に行動不能になる。受ける全てのダメージは2倍になる。</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <Chip icon={<FlashOnIcon />} label="3. ジャスト回避" color="info" />
                <Typography variant="h6">— 守りを、攻めの起点に変えろ</Typography>
              </Stack>
              <Typography paragraph>敵の攻撃に合わせて<b>[スペース]キーを押すことで、「ジャスト回避」</b>が発動する。</Typography>
              <Typography><strong>成功効果:</strong> ダメージ無効。パーフェクト回避成功時には、追加で魔王化ゲージが少しだけ減少する。</Typography>
              <Typography><strong>リスク：お手つき:</strong> 回避の受付が始まる前に[スペース]キーを押してしまうと、そのターンの回避は必ず失敗する。連打は厳禁だ。</Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* --- 全スキル解説 --- */}
        <Accordion sx={{ textAlign: 'left' }}> 
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <MenuBookIcon color="primary" />
              <Typography variant="h5" sx={{ fontWeight: 'medium' }}>全スキル解説</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Paper variant="outlined" sx={{ p: 2, mb: 3, borderColor: '#81d4fa' }}>
              <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
                <FaceIcon color="info" />
                <Typography variant="h6" color="#0288d1" sx={{ fontWeight: 'bold' }}>【人間フォーム】 — お膳立てと、代償を浄化する技巧</Typography>
              </Stack>
              {skillsData.human.map(skill => (
                <Box key={skill.name} sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                  <Chip label={skill.key} sx={{ mr: 2, minWidth: 48, height: 48, fontSize: '1.2rem', fontWeight: 'bold' }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{skill.name}</Typography>
                    <Typography variant="body2">{skill.description}</Typography>
                  </Box>
                </Box>
              ))}
            </Paper>
            <Paper variant="outlined" sx={{ p: 2, borderColor: '#ce93d8' }}>
              <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
                <AcUnitIcon color="secondary" />
                <Typography variant="h6" color="#ab47bc" sx={{ fontWeight: 'bold' }}>【魔王フォーム】 — 圧倒的な力と、その重い代償</Typography>
              </Stack>
              {skillsData.demon.map(skill => (
                <Box key={skill.name} sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                  <Chip label={skill.key} color="secondary" sx={{ mr: 2, minWidth: 48, height: 48, fontSize: '1.2rem', fontWeight: 'bold' }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{skill.name}</Typography>
                    <Typography variant="body2">{skill.description}</Typography>
                  </Box>
                </Box>
              ))}
            </Paper>
          </AccordionDetails>
        </Accordion>
        
        {/* --- 敵キャラクター攻略 --- */}
        <Accordion sx={{ textAlign: 'left' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <SecurityIcon color="primary" />
              <Typography variant="h5" sx={{ fontWeight: 'medium' }}>敵キャラクター攻略</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            {enemiesData.map((enemy) => (
              <Card key={enemy.name} sx={{ mb: 3 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={enemy.image}
                  alt={enemy.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>{enemy.name}</Typography>
                  <Chip label={`ギミック: ${enemy.gimmick}`} color="error" size="small" sx={{ mb: 2 }}/>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
                    <strong>【行動パターン】</strong><br/>{enemy.pattern}<br/><br/>
                    <strong>【攻略のコツ】</strong><br/>{enemy.tips}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </AccordionDetails>
        </Accordion>
      </Container>
      <Button color="inherit" href="/"><h2>ホームへ戻る</h2></Button>
    </>
  );
};

export default Kouryaku;