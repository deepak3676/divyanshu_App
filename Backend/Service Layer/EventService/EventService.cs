using Domain_Layer.Models;
using Repository_Layer.IEventRepo;
using Service_Layer.IEventService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service_Layer.EventService
{
    public class EventService : IEventService<Event>
    {
        private readonly IEventRepo<Event> _eventRepository;

        public EventService(IEventRepo<Event> eventRepository)
        {
            _eventRepository = eventRepository;
        }
        public IEnumerable<Event> AddEvents(IEnumerable<Event> newEvents)
        {
            return _eventRepository.AddEvents(newEvents);
        }

        public void DeleteEvent(Event eventToDelete)
        {
            _eventRepository.DeleteEvent(eventToDelete);
        }
        public void UpdateEvent(Event updatedEvent)
        {
            _eventRepository.UpdateEvent(updatedEvent);
        }
    }
}