/**
 * Team controller
 */

const teamMembers = [
    {
        id: 'anchit-kapil',
        name: 'Anchit Kapil',
        initials: 'AK',
        role: 'Co-Founder & CEO',
        cardStyle: 'default',
        education: [
            'Lancaster University'
        ],
        experience: [
            'Director | Summer House Cafe Delhi'
        ],
        linkedin: 'https://linkedin.com/in/anchitkapil',
        email: 'anchit@crepdogcrew.com'
    },
    {
        id: 'bharat-mahrotra',
        name: 'Bharat Mahrotra',
        initials: 'BM',
        role: 'Co-Founder & CBO',
        cardStyle: 'dark',
        education: [
            'Lancaster University',
            'Warwick Business School'
        ],
        experience: [],
        linkedin: 'https://linkedin.com/in/bharatmahrotra',
        email: 'bharat@crepdogcrew.com'
    },
    {
        id: 'shaurya-kumar',
        name: 'Shaurya Kumar',
        initials: 'SK',
        role: 'Co-Founder & CBO',
        cardStyle: 'darker',
        education: [
            'London School of Economics'
        ],
        experience: [],
        linkedin: 'https://linkedin.com/in/shauryakumar',
        email: 'shaurya@crepdogcrew.com'
    }
];

const teamController = {
    /**
     * Get all team members
     */
    getTeamData: async (req, res) => {
        try {
            const teamData = {
                members: teamMembers.map(member => ({
                    id: member.id,
                    name: member.name,
                    initials: member.initials,
                    role: member.role,
                    cardStyle: member.cardStyle,
                    education: member.education,
                    experience: member.experience
                })),
                contact: {
                    email: 'fo1@crepdogcrew.com',
                    website: 'https://crepdogcrew.com'
                },
                teamPhoto: '/assets/team_photo.jpeg'
            };

            res.json(teamData);
        } catch (error) {
            console.error('Get team data error:', error);
            res.status(500).json({
                error: true,
                message: 'Failed to fetch team data'
            });
        }
    },

    /**
     * Get specific team member
     */
    getTeamMember: async (req, res) => {
        try {
            const { memberId } = req.params;

            const member = teamMembers.find(m => m.id === memberId);

            if (!member) {
                return res.status(404).json({
                    error: true,
                    message: 'Team member not found'
                });
            }

            res.json({
                id: member.id,
                name: member.name,
                initials: member.initials,
                role: member.role,
                cardStyle: member.cardStyle,
                education: member.education,
                experience: member.experience,
                linkedin: member.linkedin
            });
        } catch (error) {
            console.error('Get team member error:', error);
            res.status(500).json({
                error: true,
                message: 'Failed to fetch team member'
            });
        }
    }
};

module.exports = teamController;
