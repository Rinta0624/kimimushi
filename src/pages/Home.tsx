import {
  AppBar, Toolbar, Typography, Container, Box, Grid, Card, CardActionArea, CardContent
} from "@mui/material";
import { Link } from 'react-router-dom';

// アイコンのインポート (npm install @mui/icons-material が必要)
import PeopleIcon from '@mui/icons-material/People';
import PollIcon from '@mui/icons-material/Poll';
import BookIcon from '@mui/icons-material/Book';
import CreateIcon from '@mui/icons-material/Create';
import ExtensionIcon from '@mui/icons-material/Extension';


const Home = () => {
  const navItems = [
    { name: 'キャラクター紹介', href: '/Syoukai', icon: <PeopleIcon fontSize="large" color="primary" /> },
    { name: '人気投票', href: '/Touhyou', icon: <PollIcon fontSize="large" color="primary" /> },
    { name: 'あらすじ', href: '/Arasuzi', icon: <BookIcon fontSize="large" color="primary" /> },
    { name: '攻略情報', href: '/Kouryaku', icon: <ExtensionIcon fontSize="large" color="primary" /> },
    { name: '感想投稿', href: '/Kansou', icon: <CreateIcon fontSize="large" color="primary" /> },
  ];

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            君をむしばむこの力でーホームページ
          </Typography>
        </Toolbar>
      </AppBar>

      {/* --- アイデア1: ヒーローセクション --- */}
      <Box
        sx={{
          height: { xs: '40vh', md: '50vh' },
          backgroundImage: 'url(https://source.unsplash.com/random/1600x900?dark,fantasy)', // 背景画像（仮）
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
          p: 2,
        }}
      >
        <Typography variant="h2" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          君をむしばむこの力で
        </Typography>
        <Typography variant="h5" align="center" sx={{ mb: 4, maxWidth: '800px' }}>
          これは、呪われた力と儚い愛の物語。ホームページへようこそ。
        </Typography>
      </Box>

      {/* --- アイデア2: カード形式のナビゲーション --- */}
      <Container sx={{ py: 5 }}>
        <Grid container spacing={4}>
          {navItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.name}>
              <Card elevation={3}>
                <CardActionArea component={Link} to={item.href}>
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    {item.icon}
                    <Typography variant="h5" component="div" sx={{ mt: 2, fontWeight: 'bold' }}>
                      {item.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;