const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Middleware to verify Moodle token
const verifyToken = async (req, res, next) => {
  const token = req.cookies.moodleToken;
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verify token is valid by making a test request to Moodle
    const response = await axios.get(`${process.env.MOODLE_URL}/webservice/rest/server.php`, {
      params: {
        wstoken: token,
        wsfunction: 'core_webservice_get_site_info',
        moodlewsrestformat: 'json'
      }
    });
    
    req.moodleToken = token;
    req.moodleUser = response.data;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Authentication routes
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Get token from Moodle
    const response = await axios.post(`${process.env.MOODLE_URL}/login/token.php`, null, {
      params: {
        username,
        password,
        service: 'moodle_mobile_app' // Standard Moodle web service
      }
    });

    if (response.data.token) {
      // Set token in HTTP-only cookie
      res.cookie('moodleToken', response.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });

      res.json({ success: true });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// User and course routes
app.get('/api/user/info', verifyToken, async (req, res) => {
  try {
    const response = await axios.get(`${process.env.MOODLE_URL}/webservice/rest/server.php`, {
      params: {
        wstoken: req.moodleToken,
        wsfunction: 'core_user_get_users_by_field',
        field: 'id',
        values: [req.moodleUser.userid],
        moodlewsrestformat: 'json'
      }
    });
    
    res.json(response.data[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user info' });
  }
});

app.get('/api/user/courses', verifyToken, async (req, res) => {
  try {
    const response = await axios.get(`${process.env.MOODLE_URL}/webservice/rest/server.php`, {
      params: {
        wstoken: req.moodleToken,
        wsfunction: 'core_enrol_get_users_courses',
        userid: req.moodleUser.userid,
        moodlewsrestformat: 'json'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Progress tracking routes
app.post('/api/progress/complete-activity', verifyToken, async (req, res) => {
  const { courseid, cmid, completed } = req.body;

  try {
    const response = await axios.post(`${process.env.MOODLE_URL}/webservice/rest/server.php`, null, {
      params: {
        wstoken: req.moodleToken,
        wsfunction: 'core_completion_update_activity_completion_status_manually',
        cmid,
        completed,
        moodlewsrestformat: 'json'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update activity completion' });
  }
});

app.post('/api/grades/update', verifyToken, async (req, res) => {
  const { courseid, itemname, grade } = req.body;

  try {
    const response = await axios.post(`${process.env.MOODLE_URL}/webservice/rest/server.php`, null, {
      params: {
        wstoken: req.moodleToken,
        wsfunction: 'core_grades_update_grades',
        courseid,
        component: 'mod_quiz',
        itemname,
        grades: [{
          studentid: req.moodleUser.userid,
          grade
        }],
        moodlewsrestformat: 'json'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update grades' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 