// controllers/homeController.js
const User = require('../models/userModel');
const Job = require('../models/jobModel'); 

exports.getGreeting = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      greeting: `Good morning! ${user.name}`,
      searchPlaceholder: 'Search Jobs..'
    });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.getDates = (req, res) => { 
    try { 
        const dates = [ 
            'Sat 4', 'Sun 5', 'Mon 6', 'Tue 7', 'Wed 8' 
        ]; 
        res.status(200).json(dates); 
    } catch (error) { 
        res.status(500).json({ error: 'Server Error' }); 
    } 
};

exports.getJobs = async (req, res) => { 
    try { const jobs = await Job.find(); 
        res.status(200).json(jobs); 
    } catch (error) { 
        res.status(500).json({ error: 'Server Error' }); 
    } 
};

exports.getBottomNavigation = (req, res) => { 
    try { const navigationItems = [ 
        'Home', 'Manage Jobs', 'E-wallet', 'Profile' 
    ]; 
    res.status(200).json(navigationItems); 
} catch (error) { 
    res.status(500).json({ error: 'Server Error' }); 
} 
};

