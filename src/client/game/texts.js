
export const ProblemData = [
        {id: 'oxygenSupply', name: 'Oxygen Supply Failure', description: 'Failure in the oxygen supply system.', solutions: ['repairKit'], affected: 'oxygen', decreaseRate: 10},
        //{name: 'Impact by Meteroids', description: 'The spaceship was hit by meteroids and is now off course!', solutions: ['course'], affected: 'trajectory'},
        {id: 'foodComsumption', name: 'Food Consumption', description: 'Food supply has to be located and brought back to the group.', solutions: ['food'], affected: 'food', decreaseRate: 10}, 
        {id: 'lowWater', name: 'Low on Water Supply', description: 'Water supply has to be located and brought back to the group.', solutions: ['water'], affected: 'water', decreaseRate: 10},  
        //{name: 'Radio Signal Lost', description: 'Radio contact with Earth is lost and must be reestablished.', solutions: ['repairKit'], affected: 'radio'}, 
        {id:'engineFailrue', name: 'Engine Failure', description: 'Engine C has failed and the spaceship is losing speed!', solutions: ['repairKit'], affected: 'engine', decreaseRate: 10}
];
   
export const DangerData = ['Miniature Blackhole', 'Radioactivity', 'Space Cockroaches', 'Xhwathu Gravity Trap']
    
export const ItemData = [
        {name: 'Food supply', id: 'food'},
        {name: 'Water supply', id: 'water'},
        {name: 'Drone', id: 'drone'},
        {name: 'Quantum Repair Kit', id: 'repairKit'},
        //{name: 'Course to Earth', id: 'course'}
];

export const Rooms = [
        "Engine Room",
        "Kitchen",
        "Teleportation Room",
        "DELTA Data Center",
        "Bridge",
        "Intelligence Room",
        "Garden",
        "Storage Room",
        "Swimming Pool",
        "Quantum Lab"
]
    
export const StatusData = [
        {name: 'Oxygen', id: 'oxygen', value: 100}, 
        {name: 'Water', id: 'water', value: 100}, 
        {name: 'Food', id: 'food', value: 100},
        //{name: 'Distance to Earth', id: 'distance', value: 200}, 
        //{name: 'Trajectory', id: 'trajectory', value: true}, 
        //{name: 'Radio Signal', id: 'radio', value: true},
        {name: 'Engine Quantum Stability', id: 'engine', value: 100},
        //{name: 'Trajectory', id: 'trajectory', value: 10}, 
        //{name: 'Radio Signal', id: 'radio', value: 10},
        //{name: 'Engine', id: 'engine', value: 10}
];

