import React from 'react';
import {
  AppBar, Toolbar, Typography, Container, Paper,Button
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent // 左右交互レイアウト用のコンポーネント
} from '@mui/lab';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // 開閉アイコン

// 上で定義した synopsisData 配列
const synopsisData = [
  // ... (ステップ2のデータをここに記述) ...
  {
    category: 'オープニング①',
    title: '①：追跡',
    content: '魔王復活を企む教団に追われる主人公と、その復活の「器」とされる巫女マリー。森の中を必死に逃げる二人だったが、ついに追手に追い詰められてしまう。マリーを犠牲にさせまいと、主人公は彼女を庇い、教団員たちとの戦いを決意する。'
  },
  {
    category: 'オープニング②',
    title: '②：魔王の力',
    content: '教団員との戦いで深手を負い、倒れてしまう主人公。彼が意識を取り戻すと、そこには命を削る結界で必死に彼を守るマリーの姿があった。絶体絶命の状況の中、マリーは最後の「賭け」として、自らが封じてきた魔王の力を主人公の魂に注ぎ込むことを提案する。彼女を失いたくない一心でそれを受け入れた主人公は、人ならざる漆黒の魔王へと変貌。マリーを傷つけた教団への怒りを爆発させ、圧倒的な力で敵を殲滅する。'
  },
  {
    category: '道中①',
    title: '③：命の代償',
    content: '安全な場所へ逃れた二人。しかし、主人公が手に入れた力の代償はあまりにも大きかった。その力はマリーの命そのものであり、主人公が力を振うたびに、彼女の寿命が削られていたのだ。真実を知り絶望する主人公に対し、マリーは「何があっても、優しいあなたのままでいて」と約束を求める。主人公は、彼女の命の重さを背負う覚悟を決め、その約束を受け入れるのだった。'
  },
  {
    category: '道中②',
    title: '④：二人だけの星座',
    content: '背負った宿命の重さに苦悩し、一人で抱え込もうとする主人公。そんな彼に、マリーは「今日あった、楽しかったことを数える」という、前を向くための「魔法」を教える。二人は夜空の星々をパンやスープに見立てて笑い合い、誰にも分からない「二人だけの星座」を作り出す。それは、過酷な旅路の中で見つけた、ささやかで温かい絆の証だった。'
  },
  {
    category: '道中③',
    title: '⑤：絶望と、夢の中の温もり',
    content: '束の間の休息も束の間、二人の前に教団の頂点に立つ「教祖」が現れる。教祖は「魔王の力を持つ者」と「器である巫女」が共にいる限り、世界の果てへ逃げようと無駄である、という絶望的な真実を告げる。希望を打ち砕かれ、心身の疲労から倒れてしまうマリー。彼女を看病する中、主人公はマリーの寝言から、自分が守っているつもりで、実は幼い頃からずっと彼女に守られてきたのだと気づく。彼は逃げることをやめ、この終わらない追跡に自らの手で終止符を打つことを決意する。'
  },
  {
    category: '最終決戦前',
    title: '⑥：最終決戦',
    content: '教団の本拠地へと乗り込んだ二人を、教祖が待ち受ける。世界の歪みを正すという大義を掲げる教祖に対し、主人公は「この力は、世界のためでも、お前らのためでもない。ただ一人、彼女を守るためだけの力だ」と宣言。マリーもまた、歪んだ理想の犠牲にはならないと強く言い放ち、二人の未来を賭けた最終決戦の火蓋が切られる。'
  },
  {
    category: '最後の選択',
    title: '⑦：最後の選択',
    content: '激闘の末に教祖を打ち破った二人。祭壇に残された古文書から、呪いを完全に解くための唯一の方法を見つけ出す。しかし、そこに記されていたのは、「力の源である巫女から、力のきっかけとなった記憶――すなわち、主人公に関する全ての記憶を消し去る」という、あまりにも残酷な真実だった。マリーを救い、普通の日常を取り戻すためには、彼女の中から自らの存在を永遠に消し去らなければならない。主人公は、究極の選択を迫られることになる。'
  }
];


const Arasuzi = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            君をむしばむこの力でーあらすじ
          </Typography>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          あらすじ
        </Typography>

        <Timeline position="alternate">
          {synopsisData.map((item, index) => (
            <TimelineItem key={index}>
              {/* 【左側】章の区分を表示 */}
              <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                align="right"
                variant="body2"
                color="text.secondary"
              >
                {item.category}
              </TimelineOppositeContent>

              {/* 【中央】線と点を表示 */}
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              
              {/* 【右側】章のタイトルと本文を表示 */}
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Accordion sx={{ textAlign: 'left' }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                  >
                    <Typography variant="h6">{item.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {item.content}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
            <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel8-content`}
                    id={`panel8-header`}
                  >
                    <Typography variant="h6">
            ⑧：あなただけのエンディングへ
                    </Typography>
            </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    魔王化ゲージ20以下で、選択肢出現でTRUE ENDかHUMAN ENDへの分岐選択肢が出現します。
                    21以上の場合はBAD END(魔王化エンド)へ直行します。
                    TRUE ENDは、マリーの記憶を消す選択肢のエンディングです。
                    HUMAN ENDは、マリーの記憶を消さない選択肢のエンディングです。
                  </Typography>
                </AccordionDetails>
            </Accordion>
      </Container>
      <Button color="inherit" href="/"><h2>ホームへ戻る</h2></Button>
    </>
  );
};

export default Arasuzi;

