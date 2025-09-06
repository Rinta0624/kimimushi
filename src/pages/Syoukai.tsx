import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar // キャラクター画像を丸く表示するために使用
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import heroImage from '../assets/hero.png'; // ファイルの場所に合わせてパスを調整してください
import marieImage from '../assets/marie.png';
import cultLeaderImage from '../assets/cult-leader.png';
// @mui/lab の Timeline は今回は使わないので削除しました
// import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';

// キャラクターデータは、このファイルの先頭、または別のファイルからimportしてください
const charactersData = [
    {
    id: 1,
    name: "主人公 (仮名)",
    role: "魔王の力を宿した青年",
    image: heroImage, 
    description: "魔王復活の「器」として狙われるマリーを守るため、自らの身に魔王の力を取り込んだ青年。優しさと、大切な人を守るための強さを併せ持つ。時折、力の暴走に苦しむ一面も。",
    backstory: "幼い頃から人知れず孤独を抱えていたが、マリーとの出会いで人生が一変する。彼女を守るためなら、どんな代償も厭わない覚悟を決めている。魔王の力を手に入れた後も、人間としての心を保ち続ける彼の葛藤が物語の核となる。"
  },
  {
    id: 2,
    name: "マリー",
    role: "魔王の器たる巫女",
    image: marieImage, 
    description: "教団に「魔王の器」として狙われる、儚くも芯の強い巫女。主人公に魔王の力を与え、自らの命を削って彼を支える。彼の優しさと、諦めない心に深く惹かれている。",
    backstory: "代々、魔王の力を封じる巫女の家系に生まれた。幼い頃からその宿命を知り、自身の未来を諦めていた。しかし、主人公と出会い、彼との未来を夢見るようになる。彼の言葉と行動が、彼女の閉ざされた心に希望の光をもたらした。"
  },
  {
    id: 3,
    name: "教祖 (仮名)",
    role: "教団の指導者",
    image: cultLeaderImage,
    description: "世界の歪みを正すという大義を掲げ、魔王の復活を目論む謎多き人物。冷徹な思考を持ち、目的のためにはどんな犠牲も厭わない。主人公とマリーの前に幾度となく立ちはだかる。",
    backstory: "かつて世界を救うために力を求め、やがてその理想が歪んでいった。自身の過去に深い後悔を抱えているが、その道しか世界を救う方法はないと信じている。彼の真の目的は、物語の終盤で明らかになる。"
  }
];

const Syoukai = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            君をむしばむこの力でーキャラクター紹介
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 3, mb: 3 }}> {/* mt: margin-top, mb: margin-bottom */}
        <Typography variant="h4" gutterBottom align="center">
          キャラクター紹介
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          この物語を彩る個性豊かなキャラクターたちを紹介します。
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {charactersData.map((character) => (
            <Grid item xs={12} sm={6} md={4} key={character.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    {/* キャラクター画像 */}
                    <Avatar
                      alt={character.name}
                      src={character.image}
                      sx={{ width: 100, height: 100, mr: 2, flexShrink: 0 }} // mr: margin-right, flexShrink: 0で縮まないように
                    />
                    {/* キャラクター説明 */}
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                        {character.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                        {character.role}
                      </Typography>
                      <Typography variant="body2">
                        {character.description}
                      </Typography>
                    </Box>
                  </Box>

                  {/* 裏話アコーディオン */}
                  <Accordion sx={{ mt: 2 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${character.id}-content`}
                      id={`panel${character.id}-header`}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        裏話
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" color="text.secondary">
                        {character.backstory}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Button color="inherit" href="/"><h2>ホームへ戻る</h2></Button>
    </>
  );
};
export default Syoukai;