
export const ProblemData = [
        {name: 'Oxygen Supply Failure', description: 'Failure in the oxygen supply system.', solution: ['repairKit'], affected: 'oxygen', decreaseRate: 5},
        {name: 'Impact by Meteroids', description: 'The spaceship was hit by meteroids and is now off course!', solution: ['course'], affected: 'trajectory'},
        {name: 'Food Consumption', description: 'Food supply has to be located and brought back to the group.', solution: ['food'], affected: 'food', decreaseRate: 5}, 
        {name: 'Low on Water Supply', description: 'Water suppyl has to be located and brought back to the group.', solution: ['water'], affected: 'water', decreaseRate: 5},  
        {name: 'Radio Signal Lost', description: 'Radio contact with Earth is lost and must be reestablished.', solution: ['repairKit'], affected: 'radio'}, 
        {name: 'Engine Failure', description: 'Engine C has failed and the spaceship is losing speed!', solution: ['repairKit'], affected: 'engine', decreaseRate: 10}
];
   
export const DangerData = ['Miniature Blackhole', 'Radioactivity', 'Space Cockroaches', 'Xhwathu Gravity Trap']
    
export const ItemData = [
        {name: 'Food supply', id: 'food'},
        {name: 'Water supply', id: 'water'},
        {name: 'Drone', id: 'drone'},
        {name: 'Quantum Repair Kit', id: 'repairKit'},
        {name: 'Course to Earth', id: 'course'}
];
    
export const StatusData = [
        {name: 'Oxygen', id: 'oxygen', value: 100}, 
        {name: 'Water', id: 'water', value: 100}, 
        {name: 'Food', id: 'food', value: 100},
        {name: 'Distance to Earth', id: 'distance', value: 200}, 
        {name: 'Trajectory', id: 'trajectory', value: 10}, 
        {name: 'Radio Signal', id: 'radio', value: 10},
        {name: 'Engine', id: 'engine', value: 10}
];

export const RoomsData = [
        {name: 'Cockpit', id:'cockpit'},
        {name: 'Engine Room', id: 'engine'},
        {name: 'Food Storage', id: 'foodStorage'},
        {name: 'Water Tank', id: 'waterTank'},
        {name: 'Radio Room', id: 'radioRoom'},
        {name: 'East Warehouse', id: 'eastWarehouse'},
        {name: 'West Warehouse', id: 'westWarehous'},
        {name: 'South Warehouse', id: 'southWarehouse'},
        {name: 'North Warehouse', id: 'northWarehouse'},
        {name: "Bathroom", id: 'bathroom'},
        {name: "Medical Ward", id: 'medicalWard'},
        {name: 'Data Room', id: 'dataRoom'}
];
